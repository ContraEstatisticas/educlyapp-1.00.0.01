import bpy
import math
import os
from mathutils import Vector


SOURCE_FILE = r"C:\Users\User\Documents\GitHub\Marcos\educlyapp-1.00.0.01\assets\3dAvatar\modeloFinal.glb"
OUTPUT_FILE = r"C:\Users\User\Documents\GitHub\Marcos\educlyapp-1.00.0.01\assets\3dAvatar\modeloFinal_lipsync.glb"
OUTPUT_BLEND = r"C:\Users\User\Documents\GitHub\Marcos\educlyapp-1.00.0.01\assets\3dAvatar\modeloFinal_lipsync.blend"


def gaussian(value: float, center: float, width: float) -> float:
    if width == 0:
        return 0.0
    return math.exp(-(((value - center) / width) ** 2))


def smoothstep(edge0: float, edge1: float, x: float) -> float:
    if edge0 == edge1:
        return 0.0
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)


def clamp(value: float, min_value: float, max_value: float) -> float:
    return max(min_value, min(max_value, value))


def make_masks(co: Vector):
    x_abs = abs(co.x)
    mouth = (
        gaussian(x_abs, 0.0, 0.115)
        * gaussian(co.z, 0.80, 0.075)
        * gaussian(co.y, -0.49, 0.045)
    )
    mouth *= 1.0 if (0.70 <= co.z <= 0.93 and -0.60 <= co.y <= -0.35) else 0.0

    upper = mouth * smoothstep(0.79, 0.83, co.z)
    lower = mouth * (1.0 - smoothstep(0.77, 0.81, co.z))
    center = mouth * gaussian(x_abs, 0.0, 0.035)
    mid = mouth * gaussian(x_abs, 0.0, 0.07)
    outer = mouth * gaussian(x_abs, 0.11, 0.035)
    jaw = (
        gaussian(x_abs, 0.0, 0.16)
        * gaussian(co.z, 0.66, 0.11)
        * gaussian(co.y, -0.33, 0.08)
    )
    jaw *= 1.0 if (0.46 <= co.z <= 0.86 and -0.52 <= co.y <= -0.20) else 0.0
    chin = (
        gaussian(x_abs, 0.0, 0.14)
        * gaussian(co.z, 0.54, 0.07)
        * gaussian(co.y, -0.29, 0.07)
    )
    chin *= 1.0 if (0.40 <= co.z <= 0.70 and -0.45 <= co.y <= -0.16) else 0.0
    lip_front = gaussian(co.y, -0.54, 0.03) * gaussian(co.z, 0.81, 0.07) * gaussian(x_abs, 0.0, 0.1)
    mouth_line = mouth * gaussian(co.z, 0.79, 0.02)

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
    masks = make_masks(co)
    sign_x = 1.0 if co.x >= 0 else -1.0
    delta = Vector((0.0, 0.0, 0.0))

    if name == "viseme_sil":
        return delta

    if name == "viseme_PP":
        delta.z += -0.012 * masks["upper"] + 0.016 * masks["lower"]
        delta.y += -0.003 * masks["mouth_line"]
    elif name == "viseme_FF":
        delta.z += 0.011 * masks["lower"] - 0.002 * masks["upper"]
        delta.y += 0.008 * masks["lower"] + 0.0035 * masks["lip_front"]
    elif name == "viseme_TH":
        delta.z += 0.010 * masks["lower"] - 0.002 * masks["upper"]
        delta.y += -0.003 * masks["center"] + 0.0015 * masks["mid"]
    elif name == "viseme_DD":
        delta.z += 0.006 * masks["lower"] - 0.001 * masks["upper"]
        delta.y += 0.003 * masks["center"]
    elif name == "viseme_kk":
        delta.z += 0.005 * masks["lower"] - 0.001 * masks["upper"]
        delta.y += 0.003 * masks["center"]
        delta.z += -0.008 * masks["jaw"]
    elif name == "viseme_CH":
        delta.x += sign_x * 0.003 * masks["outer"] - sign_x * 0.001 * masks["mid"]
        delta.z += 0.003 * masks["upper"] - 0.007 * masks["lower"]
        delta.y += -0.003 * masks["center"]
    elif name == "viseme_SS":
        delta.x += sign_x * 0.005 * masks["outer"]
        delta.z += -0.003 * masks["upper"] + 0.003 * masks["lower"]
        delta.y += 0.002 * masks["mid"]
    elif name == "viseme_nn":
        delta.x += sign_x * 0.003 * masks["outer"]
        delta.z += -0.002 * masks["upper"] + 0.003 * masks["lower"]
        delta.y += 0.003 * masks["center"]
    elif name == "viseme_RR":
        delta.x += -sign_x * 0.004 * masks["mid"]
        delta.z += 0.001 * masks["upper"] - 0.004 * masks["lower"]
        delta.y += -0.005 * masks["center"]
    elif name == "viseme_aa":
        delta.z += 0.020 * masks["upper"] - 0.048 * masks["lower"] - 0.038 * masks["jaw"] - 0.024 * masks["chin"]
        delta.y += -0.002 * masks["mouth_line"]
    elif name == "viseme_E":
        delta.x += sign_x * 0.006 * masks["outer"] + sign_x * 0.002 * masks["mid"]
        delta.z += 0.003 * masks["upper"] - 0.004 * masks["lower"]
        delta.y += 0.0015 * masks["mid"]
    elif name == "viseme_ih":
        delta.x += sign_x * 0.004 * masks["outer"] + sign_x * 0.0015 * masks["mid"]
        delta.z += 0.002 * masks["upper"] - 0.003 * masks["lower"]
        delta.y += 0.001 * masks["mid"]
    elif name == "viseme_oh":
        delta.x += -sign_x * 0.004 * masks["mid"]
        delta.z += 0.005 * masks["upper"] - 0.018 * masks["lower"] - 0.014 * masks["jaw"]
        delta.y += -0.004 * masks["center"]
    elif name == "viseme_ou":
        delta.x += -sign_x * 0.005 * masks["mid"]
        delta.z += 0.002 * masks["upper"] - 0.010 * masks["lower"] - 0.007 * masks["jaw"]
        delta.y += -0.006 * masks["center"]

    return delta


def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=SOURCE_FILE)

    mesh_object = next((obj for obj in bpy.data.objects if obj.type == "MESH"), None)
    if mesh_object is None:
      raise RuntimeError("Nenhum objeto MESH encontrado no GLB")

    bpy.context.view_layer.objects.active = mesh_object
    mesh_object.select_set(True)
    bpy.ops.object.mode_set(mode="OBJECT")

    mesh = mesh_object.data
    basis_coords = [vertex.co.copy() for vertex in mesh.vertices]

    mesh_object.shape_key_add(name="Basis", from_mix=False)

    viseme_names = [
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

    for name in viseme_names:
        key_block = mesh_object.shape_key_add(name=name, from_mix=False)
        for index, source_co in enumerate(basis_coords):
            key_block.data[index].co = source_co + viseme_delta(name, source_co)

    bpy.ops.file.pack_all()
    bpy.ops.wm.save_as_mainfile(filepath=OUTPUT_BLEND, compress=True)

    bpy.ops.export_scene.gltf(
        filepath=OUTPUT_FILE,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_morph=True,
        export_morph_normal=False,
        export_morph_tangent=False,
    )

    print(f"Exportado com visemes para: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
