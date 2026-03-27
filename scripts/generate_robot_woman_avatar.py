import bpy
import math
from mathutils import Vector


OUTPUT_GLB = r"C:\Users\User\Documents\GitHub\Marcos\educlyapp-1.00.0.01\assets\3dAvatar\robotWoman_v2.glb"
OUTPUT_BLEND = r"C:\Users\User\Documents\GitHub\Marcos\educlyapp-1.00.0.01\assets\3dAvatar\robotWoman_v2.blend"
OUTPUT_PREVIEW = r"C:\Users\User\Documents\GitHub\Marcos\educlyapp-1.00.0.01\assets\3dAvatar\robotWoman_v2_preview.png"
OUTPUT_PREVIEW_OPEN = r"C:\Users\User\Documents\GitHub\Marcos\educlyapp-1.00.0.01\assets\3dAvatar\robotWoman_v2_preview_open.png"

VISEME_NAMES = [
    "viseme_sil",
    "viseme_PP",
    "viseme_FF",
    "viseme_TH",
    "viseme_DD",
    "viseme_kk",
    "viseme_CH",
    "viseme_SS",
    "viseme_nn",
    "viseme_RR",
    "viseme_aa",
    "viseme_E",
    "viseme_ih",
    "viseme_oh",
    "viseme_ou",
]


def clamp(value: float, min_value: float, max_value: float) -> float:
    return max(min_value, min(max_value, value))


def smoothstep(edge0: float, edge1: float, x: float) -> float:
    if edge0 == edge1:
        return 0.0

    if edge0 < edge1:
        t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    else:
        t = clamp((edge0 - x) / (edge0 - edge1), 0.0, 1.0)

    return t * t * (3.0 - 2.0 * t)


def gaussian(value: float, center: float, width: float) -> float:
    if width == 0:
        return 0.0
    return math.exp(-(((value - center) / width) ** 2))


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items.keys() else "BLENDER_EEVEE"
    scene.render.resolution_x = 1180
    scene.render.resolution_y = 1180
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = "PNG"

    if hasattr(scene.eevee, "taa_render_samples"):
        scene.eevee.taa_render_samples = 64

    if hasattr(scene.eevee, "use_gtao"):
        scene.eevee.use_gtao = True

    if hasattr(scene.eevee, "use_bloom"):
        scene.eevee.use_bloom = True

    world = scene.world
    if world is None:
        world = bpy.data.worlds.new("World")
        scene.world = world

    world.use_nodes = True
    background = world.node_tree.nodes["Background"]
    background.inputs[0].default_value = (0.03, 0.05, 0.09, 1.0)
    background.inputs[1].default_value = 0.85

    return scene


def make_principled_material(
    name: str,
    base_color,
    metallic: float,
    roughness: float,
    emission_color=None,
    emission_strength: float = 0.0,
):
    material = bpy.data.materials.new(name=name)
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    nodes.clear()

    output = nodes.new("ShaderNodeOutputMaterial")
    shader = nodes.new("ShaderNodeBsdfPrincipled")
    shader.location = (0, 0)
    output.location = (260, 0)

    shader.inputs["Base Color"].default_value = base_color
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness

    if "Coat Weight" in shader.inputs:
        shader.inputs["Coat Weight"].default_value = 0.16

    if emission_color is not None:
        if "Emission Color" in shader.inputs:
            shader.inputs["Emission Color"].default_value = emission_color
        elif "Emission" in shader.inputs:
            shader.inputs["Emission"].default_value = emission_color

        if "Emission Strength" in shader.inputs:
            shader.inputs["Emission Strength"].default_value = emission_strength

    links.new(shader.outputs["BSDF"], output.inputs["Surface"])
    return material


def apply_material(obj, material):
    obj.data.materials.clear()
    obj.data.materials.append(material)


def apply_scale(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.select_set(False)


def apply_modifier(obj, modifier_name: str):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.modifier_apply(modifier=modifier_name)
    obj.select_set(False)


def smooth_object(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.shade_smooth()
    obj.select_set(False)


def add_beveled_cube(name: str, location, scale, material, rotation=(0.0, 0.0, 0.0), bevel=0.045):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    apply_scale(obj)

    bevel_modifier = obj.modifiers.new(name="Bevel", type="BEVEL")
    bevel_modifier.width = bevel
    bevel_modifier.segments = 3
    apply_modifier(obj, "Bevel")

    apply_material(obj, material)
    smooth_object(obj)
    return obj


def create_head(head_material):
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=96,
        ring_count=64,
        radius=0.56,
        location=(0.0, 0.0, 1.66),
    )
    head = bpy.context.object
    head.name = "RobotWomanHead"
    head.scale = (0.79, 0.66, 1.02)
    apply_scale(head)

    for vertex in head.data.vertices:
        x, y, z = vertex.co
        x_abs = abs(x)
        front = smoothstep(0.02, 0.46, y)
        center = 1.0 - smoothstep(0.18, 0.42, x_abs)
        lower = smoothstep(-0.02, -0.44, z)
        chin = smoothstep(-0.16, -0.48, z) * center
        temple = smoothstep(0.18, 0.42, x_abs) * smoothstep(-0.08, 0.32, z)
        brow = smoothstep(0.08, 0.42, z) * front * center
        cheek = smoothstep(0.06, 0.34, y) * smoothstep(-0.26, 0.06, z)
        face_plane = gaussian(x_abs, 0.0, 0.22) * gaussian(z, 0.02, 0.30) * smoothstep(0.12, 0.38, y)
        eye_socket = gaussian(x_abs, 0.14, 0.06) * gaussian(z, 0.06, 0.08) * smoothstep(0.15, 0.36, y)
        nose_ridge = gaussian(x_abs, 0.0, 0.028) * gaussian(z, 0.00, 0.18) * smoothstep(0.14, 0.34, y)
        philtrum = gaussian(x_abs, 0.0, 0.030) * gaussian(z, -0.08, 0.04) * smoothstep(0.16, 0.32, y)
        lip_volume = gaussian(x_abs, 0.0, 0.07) * gaussian(z, -0.10, 0.05) * smoothstep(0.16, 0.32, y)
        crown = gaussian(x_abs, 0.0, 0.24) * smoothstep(0.24, 0.50, z)
        jaw_outer = gaussian(x_abs, 0.19, 0.08) * smoothstep(-0.06, -0.34, z)
        skull_side = gaussian(x_abs, 0.30, 0.12) * gaussian(z, 0.12, 0.28)

        vertex.co.y *= 1.0 - 0.26 * front * (0.38 + center * 0.62)
        vertex.co.y -= 0.044 * face_plane
        vertex.co.y -= 0.040 * eye_socket
        vertex.co.y += 0.023 * nose_ridge
        vertex.co.y += 0.010 * philtrum
        vertex.co.y += 0.012 * lip_volume
        vertex.co.x *= 1.0 - 0.16 * lower
        vertex.co.y += 0.032 * lower * center
        vertex.co.z -= 0.020 * lower * center * front
        vertex.co.z -= 0.040 * chin
        vertex.co.y += 0.040 * chin
        vertex.co.z += 0.040 * brow
        vertex.co.y += 0.026 * temple
        vertex.co.x *= 1.0 + 0.032 * cheek
        vertex.co.x *= 1.0 + 0.050 * jaw_outer
        vertex.co.x *= 1.0 - 0.030 * center * smoothstep(-0.18, -0.44, z)
        vertex.co.z += 0.022 * crown
        vertex.co.y += 0.010 * skull_side

    apply_material(head, head_material)
    smooth_object(head)
    return head


def create_mouth_cavity(material):
    bpy.ops.mesh.primitive_cube_add(location=(0.0, 0.305, 1.545))
    cavity = bpy.context.object
    cavity.name = "RobotWomanMouthCavity"
    cavity.scale = (0.118, 0.040, 0.050)
    apply_scale(cavity)

    bevel_modifier = cavity.modifiers.new(name="Bevel", type="BEVEL")
    bevel_modifier.width = 0.020
    bevel_modifier.segments = 4
    apply_modifier(cavity, "Bevel")

    apply_material(cavity, material)
    smooth_object(cavity)
    return cavity


def create_eye(name: str, x: float, socket_material, iris_material):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=0.080, location=(x, 0.256, 1.73))
    eyeball = bpy.context.object
    eyeball.name = f"{name}Ball"
    eyeball.scale = (1.0, 0.50, 0.88)
    apply_scale(eyeball)
    apply_material(eyeball, socket_material)
    smooth_object(eyeball)

    bpy.ops.mesh.primitive_uv_sphere_add(segments=40, ring_count=20, radius=0.028, location=(x, 0.318, 1.728))
    iris = bpy.context.object
    iris.name = f"{name}Iris"
    iris.scale = (0.90, 0.45, 1.0)
    apply_scale(iris)
    apply_material(iris, iris_material)
    smooth_object(iris)

    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.050,
        minor_radius=0.005,
        major_segments=48,
        minor_segments=12,
        location=(x, 0.266, 1.73),
        rotation=(math.radians(90), 0.0, 0.0),
    )
    ring = bpy.context.object
    ring.name = f"{name}EyeHalo"
    apply_material(ring, iris_material)
    smooth_object(ring)

    return [eyeball, iris, ring]


def create_temple_disc(name: str, x: float, dark_material, glow_material):
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.065, depth=0.030, location=(x, 0.0, 1.66), rotation=(math.radians(90), 0.0, 0.0))
    disc = bpy.context.object
    disc.name = f"{name}TempleDisc"
    apply_material(disc, dark_material)
    smooth_object(disc)

    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.044,
        minor_radius=0.006,
        major_segments=48,
        minor_segments=12,
        location=(x + (0.002 if x > 0 else -0.002), 0.016, 1.66),
        rotation=(math.radians(90), 0.0, 0.0),
    )
    ring = bpy.context.object
    ring.name = f"{name}TempleGlow"
    apply_material(ring, glow_material)
    smooth_object(ring)
    return [disc, ring]


def create_face_panels(light_material, dark_material):
    panels = []

    panels.append(
        add_beveled_cube(
            "ForeheadPlate",
            (0.0, 0.248, 1.96),
            (0.158, 0.022, 0.060),
            light_material,
            rotation=(math.radians(10), 0.0, 0.0),
            bevel=0.022,
        )
    )

    panels.append(
        add_beveled_cube(
            "NoseBridge",
            (0.0, 0.254, 1.66),
            (0.030, 0.018, 0.160),
            dark_material,
            rotation=(math.radians(-4), 0.0, 0.0),
            bevel=0.012,
        )
    )

    panels.append(
        add_beveled_cube(
            "MouthFrame",
            (0.0, 0.272, 1.555),
            (0.115, 0.014, 0.050),
            dark_material,
            rotation=(0.0, 0.0, 0.0),
            bevel=0.014,
        )
    )

    for side in (-1.0, 1.0):
        panels.append(
            add_beveled_cube(
                f"CheekPlate{int(side)}",
                (0.228 * side, 0.236, 1.615),
                (0.082, 0.018, 0.130),
                light_material,
                rotation=(math.radians(0), math.radians(side * 10), math.radians(side * 14)),
                bevel=0.018,
            )
        )

        panels.append(
            add_beveled_cube(
                f"JawPlate{int(side)}",
                (0.176 * side, 0.210, 1.430),
                (0.070, 0.018, 0.100),
                dark_material,
                rotation=(math.radians(0), math.radians(side * 12), math.radians(side * 14)),
                bevel=0.016,
            )
        )

        panels.append(
            add_beveled_cube(
                f"BrowPlate{int(side)}",
                (0.125 * side, 0.232, 1.825),
                (0.094, 0.015, 0.040),
                light_material,
                rotation=(math.radians(-10), math.radians(side * 10), math.radians(side * 8)),
                bevel=0.012,
            )
        )

    return panels


def create_glow_curve(name: str, points, material):
    curve_data = bpy.data.curves.new(name=name, type="CURVE")
    curve_data.dimensions = "3D"
    curve_data.resolution_u = 20
    curve_data.bevel_depth = 0.0032
    curve_data.bevel_resolution = 5

    spline = curve_data.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)

    for bezier_point, point in zip(spline.bezier_points, points):
        bezier_point.co = point
        bezier_point.handle_left_type = "AUTO"
        bezier_point.handle_right_type = "AUTO"

    curve_object = bpy.data.objects.new(name, curve_data)
    bpy.context.scene.collection.objects.link(curve_object)
    curve_object.data.materials.append(material)

    bpy.context.view_layer.objects.active = curve_object
    curve_object.select_set(True)
    bpy.ops.object.convert(target="MESH")
    curve_object.select_set(False)
    smooth_object(curve_object)
    return curve_object


def create_neck_and_torso(light_material, dark_material, glow_material, warm_glow_material):
    objects = []

    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.100, depth=0.42, location=(0.0, 0.0, 1.10))
    spine = bpy.context.object
    spine.name = "NeckCore"
    apply_material(spine, dark_material)
    smooth_object(spine)
    objects.append(spine)

    cable_positions = [
        (-0.10, 0.03),
        (-0.06, 0.09),
        (0.0, 0.11),
        (0.06, 0.09),
        (0.10, 0.03),
        (-0.08, -0.05),
        (0.08, -0.05),
    ]

    for index, (x, y) in enumerate(cable_positions):
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=32,
            radius=0.018,
            depth=0.48 + (0.03 if index % 2 == 0 else -0.02),
            location=(x, y, 1.08),
            rotation=(math.radians(index * 4 - 10), math.radians(index * 2 - 6), 0.0),
        )
        cable = bpy.context.object
        cable.name = f"NeckCable{index}"
        apply_material(cable, dark_material)
        smooth_object(cable)
        objects.append(cable)

    for z in (1.26, 1.18):
        bpy.ops.mesh.primitive_torus_add(
            major_radius=0.15,
            minor_radius=0.009,
            major_segments=64,
            minor_segments=16,
            location=(0.0, 0.0, z),
            rotation=(math.radians(90), 0.0, 0.0),
        )
        ring = bpy.context.object
        ring.name = f"NeckGlow{z:.2f}"
        apply_material(ring, glow_material)
        smooth_object(ring)
        objects.append(ring)

    objects.append(
        add_beveled_cube(
            "ChestPlate",
            (0.0, 0.02, 0.74),
            (0.46, 0.24, 0.18),
            light_material,
            rotation=(math.radians(8), 0.0, 0.0),
            bevel=0.060,
        )
    )

    objects.append(
        add_beveled_cube(
            "ChestInset",
            (0.0, 0.11, 0.76),
            (0.18, 0.07, 0.08),
            dark_material,
            rotation=(math.radians(8), 0.0, 0.0),
            bevel=0.035,
        )
    )

    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.25,
        minor_radius=0.032,
        major_segments=64,
        minor_segments=16,
        location=(0.0, 0.02, 1.25),
        rotation=(math.radians(90), 0.0, 0.0),
    )
    collar = bpy.context.object
    collar.name = "CollarRing"
    apply_material(collar, dark_material)
    smooth_object(collar)
    objects.append(collar)

    bpy.ops.mesh.primitive_uv_sphere_add(segments=64, ring_count=32, radius=0.22, location=(-0.52, 0.02, 0.84))
    shoulder_left = bpy.context.object
    shoulder_left.name = "ShoulderLeft"
    shoulder_left.scale = (1.0, 0.86, 0.58)
    apply_scale(shoulder_left)
    apply_material(shoulder_left, light_material)
    smooth_object(shoulder_left)
    objects.append(shoulder_left)

    bpy.ops.mesh.primitive_uv_sphere_add(segments=64, ring_count=32, radius=0.22, location=(0.52, 0.02, 0.84))
    shoulder_right = bpy.context.object
    shoulder_right.name = "ShoulderRight"
    shoulder_right.scale = (1.0, 0.86, 0.58)
    apply_scale(shoulder_right)
    apply_material(shoulder_right, light_material)
    smooth_object(shoulder_right)
    objects.append(shoulder_right)

    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=0.048, location=(0.0, 0.22, 0.86))
    chest_core = bpy.context.object
    chest_core.name = "ChestCore"
    apply_material(chest_core, warm_glow_material)
    smooth_object(chest_core)
    objects.append(chest_core)

    return objects


def make_mouth_masks(co: Vector):
    x_abs = abs(co.x)
    mouth = gaussian(x_abs, 0.0, 0.12) * gaussian(co.y, 0.275, 0.05) * gaussian(co.z, -0.10, 0.085)
    mouth *= 1.0 if (0.16 <= co.y <= 0.37 and -0.26 <= co.z <= 0.08) else 0.0

    upper = mouth * smoothstep(-0.10, -0.04, co.z)
    lower = mouth * (1.0 - smoothstep(-0.12, -0.04, co.z))
    center = mouth * gaussian(x_abs, 0.0, 0.035)
    mid = mouth * gaussian(x_abs, 0.0, 0.080)
    outer = mouth * gaussian(x_abs, 0.125, 0.040)
    jaw = gaussian(x_abs, 0.0, 0.18) * gaussian(co.y, 0.18, 0.07) * gaussian(co.z, -0.23, 0.10)
    jaw *= 1.0 if (0.08 <= co.y <= 0.30 and -0.42 <= co.z <= -0.02) else 0.0
    chin = gaussian(x_abs, 0.0, 0.14) * gaussian(co.y, 0.16, 0.05) * gaussian(co.z, -0.35, 0.07)
    chin *= 1.0 if (0.06 <= co.y <= 0.26 and -0.48 <= co.z <= -0.16) else 0.0
    lip_front = gaussian(co.y, 0.320, 0.030) * gaussian(co.z, -0.09, 0.055) * gaussian(x_abs, 0.0, 0.11)
    mouth_line = mouth * gaussian(co.z, -0.09, 0.02)

    return {
        "mouth": mouth,
        "upper": upper,
        "lower": lower,
        "center": center,
        "mid": mid,
        "outer": outer,
        "jaw": jaw,
        "chin": chin,
        "lip_front": lip_front,
        "mouth_line": mouth_line,
    }


def viseme_delta(name: str, co: Vector) -> Vector:
    masks = make_mouth_masks(co)
    sign_x = 1.0 if co.x >= 0.0 else -1.0
    delta = Vector((0.0, 0.0, 0.0))

    if name == "viseme_sil":
        return delta

    if name == "viseme_PP":
        delta.z += -0.010 * masks["upper"] + 0.013 * masks["lower"]
        delta.y += 0.003 * masks["center"] - 0.002 * masks["mouth_line"]
    elif name == "viseme_FF":
        delta.z += 0.010 * masks["lower"] - 0.002 * masks["upper"]
        delta.y += 0.010 * masks["lip_front"] + 0.003 * masks["lower"]
    elif name == "viseme_TH":
        delta.z += 0.009 * masks["lower"] - 0.002 * masks["upper"]
        delta.y += 0.006 * masks["center"]
    elif name == "viseme_DD":
        delta.z += 0.004 * masks["lower"] - 0.001 * masks["upper"]
        delta.y += 0.004 * masks["center"]
    elif name == "viseme_kk":
        delta.z += -0.010 * masks["jaw"] + 0.004 * masks["lower"]
    elif name == "viseme_CH":
        delta.x += sign_x * 0.006 * masks["outer"]
        delta.z += -0.004 * masks["upper"] + 0.006 * masks["lower"]
        delta.y += 0.003 * masks["center"]
    elif name == "viseme_SS":
        delta.x += sign_x * 0.011 * masks["outer"]
        delta.z += -0.003 * masks["upper"] + 0.004 * masks["lower"]
    elif name == "viseme_nn":
        delta.x += sign_x * 0.004 * masks["outer"]
        delta.z += -0.002 * masks["upper"] + 0.003 * masks["lower"]
        delta.y += 0.004 * masks["center"]
    elif name == "viseme_RR":
        delta.x += -sign_x * 0.007 * masks["mid"]
        delta.z += -0.004 * masks["lower"]
        delta.y += 0.010 * masks["center"]
    elif name == "viseme_aa":
        delta.z += 0.013 * masks["upper"] - 0.042 * masks["lower"] - 0.056 * masks["jaw"] - 0.028 * masks["chin"]
        delta.y += -0.004 * masks["mouth_line"]
    elif name == "viseme_E":
        delta.x += sign_x * 0.018 * masks["outer"] + sign_x * 0.006 * masks["mid"]
        delta.z += 0.004 * masks["upper"] - 0.004 * masks["lower"]
    elif name == "viseme_ih":
        delta.x += sign_x * 0.012 * masks["outer"] + sign_x * 0.004 * masks["mid"]
        delta.z += 0.003 * masks["upper"] - 0.003 * masks["lower"]
    elif name == "viseme_oh":
        delta.x += -sign_x * 0.006 * masks["mid"]
        delta.z += 0.006 * masks["upper"] - 0.019 * masks["lower"] - 0.018 * masks["jaw"]
        delta.y += 0.011 * masks["center"] + 0.004 * masks["lip_front"]
    elif name == "viseme_ou":
        delta.x += -sign_x * 0.010 * masks["mid"]
        delta.z += 0.003 * masks["upper"] - 0.012 * masks["lower"] - 0.010 * masks["jaw"]
        delta.y += 0.016 * masks["center"] + 0.006 * masks["lip_front"]

    return delta


def create_visemes(head):
    basis_coords = [vertex.co.copy() for vertex in head.data.vertices]
    head.shape_key_add(name="Basis", from_mix=False)

    for viseme_name in VISEME_NAMES:
        key = head.shape_key_add(name=viseme_name, from_mix=False)
        for index, source_co in enumerate(basis_coords):
            key.data[index].co = source_co + viseme_delta(viseme_name, source_co)


def create_camera_and_lights():
    bpy.ops.object.camera_add(location=(0.0, -4.95, 1.63), rotation=(math.radians(90), 0.0, 0.0))
    camera = bpy.context.object
    camera.name = "PreviewCamera"
    camera.data.lens = 72
    camera.data.clip_start = 0.1
    camera.data.clip_end = 100

    target = bpy.data.objects.new("CameraTarget", None)
    target.location = (0.0, 0.0, 1.55)
    bpy.context.scene.collection.objects.link(target)

    track_to = camera.constraints.new(type="TRACK_TO")
    track_to.target = target
    track_to.track_axis = "TRACK_NEGATIVE_Z"
    track_to.up_axis = "UP_Y"

    bpy.context.scene.camera = camera

    bpy.ops.object.light_add(type="AREA", location=(-2.2, -2.6, 3.0))
    key = bpy.context.object
    key.data.energy = 4200
    key.data.shape = "RECTANGLE"
    key.data.size = 2.6
    key.data.size_y = 2.0

    key_track = key.constraints.new(type="TRACK_TO")
    key_track.target = target
    key_track.track_axis = "TRACK_NEGATIVE_Z"
    key_track.up_axis = "UP_Y"

    bpy.ops.object.light_add(type="AREA", location=(2.4, -1.8, 2.4))
    rim = bpy.context.object
    rim.data.energy = 2100
    rim.data.color = (0.48, 0.68, 1.0)
    rim.data.size = 2.1
    rim_track = rim.constraints.new(type="TRACK_TO")
    rim_track.target = target
    rim_track.track_axis = "TRACK_NEGATIVE_Z"
    rim_track.up_axis = "UP_Y"

    bpy.ops.object.light_add(type="POINT", location=(0.0, -1.2, 0.8))
    fill = bpy.context.object
    fill.data.energy = 550
    fill.data.color = (1.0, 0.56, 0.22)


def render_preview(head, output_path: str, mouth_open: bool):
    if head.data.shape_keys:
        for key_block in head.data.shape_keys.key_blocks:
            key_block.value = 0.0

        if mouth_open:
            head.data.shape_keys.key_blocks["viseme_aa"].value = 0.88
            head.data.shape_keys.key_blocks["viseme_oh"].value = 0.18

    bpy.context.scene.render.filepath = output_path
    bpy.ops.render.render(write_still=True)


def export_glb(objects_to_export):
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects_to_export:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects_to_export[0]

    bpy.ops.export_scene.gltf(
        filepath=OUTPUT_GLB,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_morph=True,
        export_morph_normal=False,
        export_morph_tangent=False,
        export_yup=True,
    )


def main():
    reset_scene()

    pearl_white = make_principled_material(
        "PearlWhiteMetal",
        (0.86, 0.90, 0.98, 1.0),
        metallic=0.22,
        roughness=0.18,
    )
    dark_chrome = make_principled_material(
        "DarkChrome",
        (0.05, 0.07, 0.10, 1.0),
        metallic=0.96,
        roughness=0.24,
    )
    cyan_glow = make_principled_material(
        "CyanGlow",
        (0.07, 0.12, 0.18, 1.0),
        metallic=0.05,
        roughness=0.18,
        emission_color=(0.32, 0.96, 1.0, 1.0),
        emission_strength=8.0,
    )
    orange_glow = make_principled_material(
        "OrangeGlow",
        (0.18, 0.08, 0.02, 1.0),
        metallic=0.10,
        roughness=0.24,
        emission_color=(1.0, 0.52, 0.20, 1.0),
        emission_strength=6.0,
    )
    cavity_black = make_principled_material(
        "CavityBlack",
        (0.01, 0.01, 0.015, 1.0),
        metallic=0.0,
        roughness=0.72,
    )

    head = create_head(pearl_white)
    create_visemes(head)

    exported_objects = [head]
    exported_objects.extend(create_face_panels(pearl_white, dark_chrome))
    exported_objects.extend(create_eye("LeftEye", -0.155, dark_chrome, cyan_glow))
    exported_objects.extend(create_eye("RightEye", 0.155, dark_chrome, cyan_glow))
    exported_objects.extend(create_temple_disc("Left", -0.50, dark_chrome, cyan_glow))
    exported_objects.extend(create_temple_disc("Right", 0.50, dark_chrome, cyan_glow))
    exported_objects.extend(create_neck_and_torso(pearl_white, dark_chrome, cyan_glow, orange_glow))
    exported_objects.append(create_mouth_cavity(cavity_black))

    exported_objects.append(
        create_glow_curve(
            "ForeheadGlowLeft",
            [
                Vector((-0.10, 0.318, 1.94)),
                Vector((-0.03, 0.325, 1.85)),
                Vector((-0.09, 0.320, 1.75)),
                Vector((-0.02, 0.312, 1.64)),
            ],
            cyan_glow,
        )
    )
    exported_objects.append(
        create_glow_curve(
            "TempleGlowRight",
            [
                Vector((0.16, 0.306, 1.90)),
                Vector((0.26, 0.318, 1.83)),
                Vector((0.21, 0.308, 1.71)),
                Vector((0.30, 0.300, 1.58)),
            ],
            cyan_glow,
        )
    )
    exported_objects.append(
        create_glow_curve(
            "JawGlowLeft",
            [
                Vector((-0.18, 0.290, 1.56)),
                Vector((-0.25, 0.286, 1.48)),
                Vector((-0.21, 0.282, 1.39)),
            ],
            cyan_glow,
        )
    )

    create_camera_and_lights()
    render_preview(head, OUTPUT_PREVIEW, mouth_open=False)
    render_preview(head, OUTPUT_PREVIEW_OPEN, mouth_open=True)

    bpy.ops.file.pack_all()
    bpy.ops.wm.save_as_mainfile(filepath=OUTPUT_BLEND, compress=True)
    export_glb(exported_objects)

    print(f"Avatar exportado em: {OUTPUT_GLB}")
    print(f"Preview fechado: {OUTPUT_PREVIEW}")
    print(f"Preview aberto: {OUTPUT_PREVIEW_OPEN}")


if __name__ == "__main__":
    main()
