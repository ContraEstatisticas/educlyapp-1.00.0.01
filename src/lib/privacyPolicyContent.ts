type PrivacySectionWithItems = {
  title: string;
  intro: string;
  items: string[];
};

type PrivacyPolicyContent = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: {
    collection: {
      title: string;
      intro: string;
      directData: PrivacySectionWithItems;
      paymentData: {
        title: string;
        content1: string;
        content2: string;
      };
      autoData: PrivacySectionWithItems;
    };
    usage: PrivacySectionWithItems;
    legalBasis: PrivacySectionWithItems;
    sharing: PrivacySectionWithItems & {
      disclaimer: string;
    };
    security: {
      title: string;
      content1: string;
      content2: string;
    };
    rights: PrivacySectionWithItems & {
      howTo: string;
    };
    communications: PrivacySectionWithItems & {
      optOut: string;
    };
    cookies: PrivacySectionWithItems & {
      disclaimer: string;
    };
    changes: {
      title: string;
      content1: string;
      content2: string;
      content3: string;
    };
    contact: {
      title: string;
      intro: string;
    };
  };
};

const privacyPolicyTranslations: Record<string, PrivacyPolicyContent> = {
  pt: {
    title: "Política de Privacidade - Educly",
    lastUpdated: "Última atualização: janeiro de 2025",
    intro:
      "A presente Política de Privacidade descreve como o Educly coleta, utiliza, armazena, compartilha e protege os dados pessoais dos usuários que acessam e utilizam a plataforma, em conformidade com a legislação aplicável, especialmente a Lei nº 13.709/2018 - Lei Geral de Proteção de Dados (LGPD). Ao utilizar o aplicativo Educly, o usuário declara que leu, compreendeu e concorda com esta Política de Privacidade.",
    sections: {
      collection: {
        title: "1. Dados Coletados",
        intro: "O Educly poderá coletar os seguintes dados pessoais, conforme a interação do usuário com a plataforma:",
        directData: {
          title: "1.1. Dados fornecidos diretamente pelo usuário",
          intro: "",
          items: [
            "Nome",
            "Endereço de e-mail",
            "Dados de cadastro e login",
            "Informações fornecidas em comunicações com o suporte",
          ],
        },
        paymentData: {
          title: "1.2. Dados de pagamento",
          content1:
            "Os dados de pagamento são processados exclusivamente por operadoras e plataformas de pagamento terceiras, certificadas e seguras.",
          content2:
            "O Educly não armazena dados sensíveis de cartão de crédito, como número completo, código de segurança ou validade.",
        },
        autoData: {
          title: "1.3. Dados coletados automaticamente",
          intro: "",
          items: [
            "Endereço IP",
            "Informações sobre dispositivo, sistema operacional e versão do aplicativo",
            "Registros de acesso, data e horário de uso",
            "Dados de navegação e interação com a plataforma",
          ],
        },
      },
      usage: {
        title: "2. Finalidade do Uso dos Dados",
        intro: "Os dados coletados são utilizados para as seguintes finalidades:",
        items: [
          "Viabilizar o acesso e funcionamento do aplicativo",
          "Gerenciar assinaturas, cobranças e acesso ao conteúdo",
          "Processar solicitações de reembolso",
          "Atender solicitações de cancelamento ou pausa de assinatura",
          "Enviar comunicações operacionais e administrativas",
          "Melhorar a experiência do usuário e a qualidade dos serviços",
          "Cumprir obrigações legais e regulatórias",
        ],
      },
      legalBasis: {
        title: "3. Base Legal para o Tratamento dos Dados",
        intro: "O tratamento dos dados pessoais pelo Educly ocorre com base nas seguintes hipóteses legais previstas na LGPD:",
        items: [
          "Execução de contrato ou de procedimentos preliminares",
          "Cumprimento de obrigação legal ou regulatória",
          "Consentimento do titular, quando aplicável",
          "Legítimo interesse, respeitados os direitos e liberdades do usuário",
        ],
      },
      sharing: {
        title: "4. Compartilhamento de Dados",
        intro: "O Educly poderá compartilhar dados pessoais apenas quando necessário, com:",
        items: [
          "Plataformas de pagamento e operadoras financeiras",
          "Prestadores de serviços tecnológicos e de hospedagem",
          "Ferramentas de análise, métricas e suporte",
          "Autoridades públicas, mediante obrigação legal ou ordem judicial",
        ],
        disclaimer:
          "O compartilhamento ocorre sempre dentro dos limites legais e contratuais, visando a prestação adequada dos serviços.",
      },
      security: {
        title: "5. Armazenamento e Segurança dos Dados",
        content1:
          "O Educly adota medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acessos não autorizados, perda, uso indevido, alteração ou divulgação.",
        content2:
          "Os dados são armazenados apenas pelo tempo necessário para cumprir as finalidades descritas nesta Política ou conforme exigido por lei.",
      },
      rights: {
        title: "6. Direitos do Usuário",
        intro: "Nos termos da LGPD, o usuário poderá, a qualquer momento, solicitar:",
        items: [
          "Confirmação da existência de tratamento de dados",
          "Acesso aos seus dados pessoais",
          "Correção de dados incompletos, inexatos ou desatualizados",
          "Exclusão de dados, quando aplicável",
          "Informação sobre o compartilhamento de dados",
          "Revogação de consentimento, quando aplicável",
        ],
        howTo: "As solicitações deverão ser realizadas por meio do e-mail oficial:",
      },
      communications: {
        title: "7. Comunicações",
        intro: "O Educly poderá enviar comunicações relacionadas:",
        items: [
          "À conta do usuário",
          "À assinatura e cobranças",
          "A atualizações operacionais e legais",
        ],
        optOut: "O usuário poderá optar por não receber comunicações promocionais, quando aplicável.",
      },
      cookies: {
        title: "8. Uso de Cookies e Tecnologias Semelhantes",
        intro: "O Educly poderá utilizar cookies e tecnologias semelhantes para:",
        items: [
          "Melhorar a funcionalidade do aplicativo",
          "Analisar métricas de uso",
          "Aprimorar a experiência do usuário",
        ],
        disclaimer:
          "O uso dessas tecnologias respeita a legislação aplicável e as configurações do dispositivo do usuário.",
      },
      changes: {
        title: "9. Alterações desta Política",
        content1: "Esta Política de Privacidade poderá ser atualizada a qualquer momento.",
        content2: "Alterações relevantes serão comunicadas por meio do aplicativo ou canais oficiais.",
        content3: "O uso continuado da plataforma após as alterações implica concordância com a nova versão.",
      },
      contact: {
        title: "10. Contato",
        intro:
          "Em caso de dúvidas, solicitações ou exercício de direitos relacionados à privacidade e proteção de dados, o usuário deverá entrar em contato exclusivamente por meio do e-mail:",
      },
    },
  },
  en: {
    title: "Privacy Policy - Educly",
    lastUpdated: "Last updated: January 2025",
    intro:
      "This Privacy Policy describes how Educly collects, uses, stores, shares, and protects the personal data of users who access and use the platform, in accordance with applicable laws, especially Law No. 13,709/2018 - the Brazilian General Data Protection Law (LGPD). By using the Educly app, the user declares that they have read, understood, and agreed to this Privacy Policy.",
    sections: {
      collection: {
        title: "1. Data Collected",
        intro: "Educly may collect the following personal data, depending on the user's interaction with the platform:",
        directData: {
          title: "1.1. Data provided directly by the user",
          intro: "",
          items: [
            "Name",
            "Email address",
            "Registration and login data",
            "Information provided in support communications",
          ],
        },
        paymentData: {
          title: "1.2. Payment data",
          content1:
            "Payment data is processed exclusively by certified and secure third-party payment operators and platforms.",
          content2:
            "Educly does not store sensitive credit card data such as the full number, security code, or expiration date.",
        },
        autoData: {
          title: "1.3. Data collected automatically",
          intro: "",
          items: [
            "IP address",
            "Information about the device, operating system, and app version",
            "Access logs, date, and time of use",
            "Browsing and interaction data on the platform",
          ],
        },
      },
      usage: {
        title: "2. Purpose of Data Use",
        intro: "Collected data is used for the following purposes:",
        items: [
          "Enable access to and operation of the app",
          "Manage subscriptions, billing, and access to content",
          "Process refund requests",
          "Handle cancellation or subscription pause requests",
          "Send operational and administrative communications",
          "Improve the user experience and service quality",
          "Comply with legal and regulatory obligations",
        ],
      },
      legalBasis: {
        title: "3. Legal Basis for Data Processing",
        intro: "Educly processes personal data based on the following legal grounds provided for by the LGPD:",
        items: [
          "Performance of a contract or pre-contractual procedures",
          "Compliance with a legal or regulatory obligation",
          "Consent of the data subject, when applicable",
          "Legitimate interest, with the user's rights and freedoms respected",
        ],
      },
      sharing: {
        title: "4. Data Sharing",
        intro: "Educly may share personal data only when necessary, with:",
        items: [
          "Payment platforms and financial operators",
          "Technology and hosting service providers",
          "Analytics, metrics, and support tools",
          "Public authorities, when required by law or court order",
        ],
        disclaimer:
          "Sharing always occurs within legal and contractual limits, aiming at the proper delivery of the services.",
      },
      security: {
        title: "5. Data Storage and Security",
        content1:
          "Educly adopts reasonable technical and organizational measures to protect personal data against unauthorized access, loss, misuse, alteration, or disclosure.",
        content2:
          "Data is stored only for as long as necessary to fulfill the purposes described in this Policy or as required by law.",
      },
      rights: {
        title: "6. User Rights",
        intro: "Under the LGPD, the user may, at any time, request:",
        items: [
          "Confirmation of the existence of data processing",
          "Access to their personal data",
          "Correction of incomplete, inaccurate, or outdated data",
          "Deletion of data, when applicable",
          "Information about data sharing",
          "Withdrawal of consent, when applicable",
        ],
        howTo: "Requests must be made through the official email address:",
      },
      communications: {
        title: "7. Communications",
        intro: "Educly may send communications related to:",
        items: [
          "The user's account",
          "Subscription and billing",
          "Operational and legal updates",
        ],
        optOut: "The user may opt out of promotional communications, when applicable.",
      },
      cookies: {
        title: "8. Use of Cookies and Similar Technologies",
        intro: "Educly may use cookies and similar technologies to:",
        items: [
          "Improve app functionality",
          "Analyze usage metrics",
          "Enhance the user experience",
        ],
        disclaimer:
          "The use of these technologies respects applicable laws and the user's device settings.",
      },
      changes: {
        title: "9. Changes to This Policy",
        content1: "This Privacy Policy may be updated at any time.",
        content2: "Relevant changes will be communicated through the app or official channels.",
        content3: "Continued use of the platform after the changes implies agreement with the new version.",
      },
      contact: {
        title: "10. Contact",
        intro:
          "In case of questions, requests, or the exercise of rights related to privacy and data protection, the user must contact us exclusively through the email address:",
      },
    },
  },
  es: {
    title: "Política de Privacidad - Educly",
    lastUpdated: "Última actualización: enero de 2025",
    intro:
      "Esta Política de Privacidad describe cómo Educly recopila, utiliza, almacena, comparte y protege los datos personales de los usuarios que acceden y utilizan la plataforma, de conformidad con la legislación aplicable, especialmente la Ley n.º 13.709/2018 - Ley General de Protección de Datos de Brasil (LGPD). Al utilizar la aplicación Educly, el usuario declara que ha leído, comprendido y aceptado esta Política de Privacidad.",
    sections: {
      collection: {
        title: "1. Datos Recopilados",
        intro: "Educly podrá recopilar los siguientes datos personales, según la interacción del usuario con la plataforma:",
        directData: {
          title: "1.1. Datos proporcionados directamente por el usuario",
          intro: "",
          items: [
            "Nombre",
            "Dirección de correo electrónico",
            "Datos de registro e inicio de sesión",
            "Información proporcionada en comunicaciones con soporte",
          ],
        },
        paymentData: {
          title: "1.2. Datos de pago",
          content1:
            "Los datos de pago son procesados exclusivamente por operadores y plataformas de pago de terceros, certificados y seguros.",
          content2:
            "Educly no almacena datos sensibles de tarjetas de crédito, como el número completo, el código de seguridad o la fecha de vencimiento.",
        },
        autoData: {
          title: "1.3. Datos recopilados automáticamente",
          intro: "",
          items: [
            "Dirección IP",
            "Información sobre el dispositivo, el sistema operativo y la versión de la aplicación",
            "Registros de acceso, fecha y hora de uso",
            "Datos de navegación e interacción en la plataforma",
          ],
        },
      },
      usage: {
        title: "2. Finalidad del Uso de los Datos",
        intro: "Los datos recopilados se utilizan para las siguientes finalidades:",
        items: [
          "Permitir el acceso y funcionamiento de la aplicación",
          "Gestionar suscripciones, cobros y acceso al contenido",
          "Procesar solicitudes de reembolso",
          "Atender solicitudes de cancelación o pausa de suscripción",
          "Enviar comunicaciones operativas y administrativas",
          "Mejorar la experiencia del usuario y la calidad de los servicios",
          "Cumplir obligaciones legales y regulatorias",
        ],
      },
      legalBasis: {
        title: "3. Base Legal para el Tratamiento de los Datos",
        intro: "Educly trata los datos personales con base en las siguientes hipótesis legales previstas en la LGPD:",
        items: [
          "Ejecución de contrato o de procedimientos preliminares",
          "Cumplimiento de una obligación legal o regulatoria",
          "Consentimiento del titular, cuando corresponda",
          "Interés legítimo, respetando los derechos y libertades del usuario",
        ],
      },
      sharing: {
        title: "4. Compartición de Datos",
        intro: "Educly podrá compartir datos personales solo cuando sea necesario, con:",
        items: [
          "Plataformas de pago y operadores financieros",
          "Prestadores de servicios tecnológicos y de alojamiento",
          "Herramientas de analítica, métricas y soporte",
          "Autoridades públicas, por obligación legal u orden judicial",
        ],
        disclaimer:
          "La compartición siempre ocurre dentro de los límites legales y contractuales, con el fin de prestar adecuadamente los servicios.",
      },
      security: {
        title: "5. Almacenamiento y Seguridad de los Datos",
        content1:
          "Educly adopta medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida, uso indebido, alteración o divulgación.",
        content2:
          "Los datos se almacenan solo durante el tiempo necesario para cumplir las finalidades descritas en esta Política o según lo exija la ley.",
      },
      rights: {
        title: "6. Derechos del Usuario",
        intro: "De acuerdo con la LGPD, el usuario podrá solicitar en cualquier momento:",
        items: [
          "Confirmación de la existencia de tratamiento de datos",
          "Acceso a sus datos personales",
          "Corrección de datos incompletos, inexactos o desactualizados",
          "Eliminación de datos, cuando corresponda",
          "Información sobre la compartición de datos",
          "Revocación del consentimiento, cuando corresponda",
        ],
        howTo: "Las solicitudes deberán realizarse a través del correo electrónico oficial:",
      },
      communications: {
        title: "7. Comunicaciones",
        intro: "Educly podrá enviar comunicaciones relacionadas con:",
        items: [
          "La cuenta del usuario",
          "La suscripción y los cobros",
          "Actualizaciones operativas y legales",
        ],
        optOut: "El usuario podrá optar por no recibir comunicaciones promocionales, cuando corresponda.",
      },
      cookies: {
        title: "8. Uso de Cookies y Tecnologías Similares",
        intro: "Educly podrá utilizar cookies y tecnologías similares para:",
        items: [
          "Mejorar la funcionalidad de la aplicación",
          "Analizar métricas de uso",
          "Mejorar la experiencia del usuario",
        ],
        disclaimer:
          "El uso de estas tecnologías respeta la legislación aplicable y la configuración del dispositivo del usuario.",
      },
      changes: {
        title: "9. Cambios en esta Política",
        content1: "Esta Política de Privacidad puede actualizarse en cualquier momento.",
        content2: "Los cambios relevantes se comunicarán a través de la aplicación o de canales oficiales.",
        content3: "El uso continuado de la plataforma después de los cambios implica aceptación de la nueva versión.",
      },
      contact: {
        title: "10. Contacto",
        intro:
          "En caso de dudas, solicitudes o ejercicio de derechos relacionados con la privacidad y la protección de datos, el usuario deberá ponerse en contacto exclusivamente por medio del correo electrónico:",
      },
    },
  },
  fr: {
    title: "Politique de Confidentialité - Educly",
    lastUpdated: "Dernière mise à jour : janvier 2025",
    intro:
      "La présente Politique de Confidentialité décrit comment Educly collecte, utilise, stocke, partage et protège les données personnelles des utilisateurs qui accèdent à la plateforme et l'utilisent, conformément à la législation applicable, en particulier la Loi n° 13.709/2018 - Loi générale brésilienne sur la protection des données (LGPD). En utilisant l'application Educly, l'utilisateur déclare avoir lu, compris et accepté cette Politique de Confidentialité.",
    sections: {
      collection: {
        title: "1. Données Collectées",
        intro: "Educly peut collecter les données personnelles suivantes, selon l'interaction de l'utilisateur avec la plateforme :",
        directData: {
          title: "1.1. Données fournies directement par l'utilisateur",
          intro: "",
          items: [
            "Nom",
            "Adresse e-mail",
            "Données d'inscription et de connexion",
            "Informations fournies dans les communications avec l'assistance",
          ],
        },
        paymentData: {
          title: "1.2. Données de paiement",
          content1:
            "Les données de paiement sont traitées exclusivement par des opérateurs et plateformes de paiement tiers, certifiés et sécurisés.",
          content2:
            "Educly ne stocke pas de données sensibles de carte bancaire, telles que le numéro complet, le code de sécurité ou la date d'expiration.",
        },
        autoData: {
          title: "1.3. Données collectées automatiquement",
          intro: "",
          items: [
            "Adresse IP",
            "Informations sur l'appareil, le système d'exploitation et la version de l'application",
            "Journaux d'accès, date et heure d'utilisation",
            "Données de navigation et d'interaction sur la plateforme",
          ],
        },
      },
      usage: {
        title: "2. Finalité de l'Utilisation des Données",
        intro: "Les données collectées sont utilisées aux fins suivantes :",
        items: [
          "Permettre l'accès et le fonctionnement de l'application",
          "Gérer les abonnements, la facturation et l'accès au contenu",
          "Traiter les demandes de remboursement",
          "Traiter les demandes d'annulation ou de pause d'abonnement",
          "Envoyer des communications opérationnelles et administratives",
          "Améliorer l'expérience utilisateur et la qualité des services",
          "Respecter les obligations légales et réglementaires",
        ],
      },
      legalBasis: {
        title: "3. Base Légale du Traitement des Données",
        intro: "Educly traite les données personnelles sur la base des fondements juridiques suivants prévus par la LGPD :",
        items: [
          "Exécution d'un contrat ou de procédures précontractuelles",
          "Respect d'une obligation légale ou réglementaire",
          "Consentement de la personne concernée, le cas échéant",
          "Intérêt légitime, dans le respect des droits et libertés de l'utilisateur",
        ],
      },
      sharing: {
        title: "4. Partage des Données",
        intro: "Educly ne peut partager des données personnelles que lorsque cela est nécessaire, avec :",
        items: [
          "Plateformes de paiement et opérateurs financiers",
          "Prestataires de services technologiques et d'hébergement",
          "Outils d'analyse, de métriques et d'assistance",
          "Autorités publiques, en cas d'obligation légale ou d'ordonnance judiciaire",
        ],
        disclaimer:
          "Le partage intervient toujours dans le respect des limites légales et contractuelles, afin d'assurer la bonne fourniture des services.",
      },
      security: {
        title: "5. Stockage et Sécurité des Données",
        content1:
          "Educly adopte des mesures techniques et organisationnelles raisonnables pour protéger les données personnelles contre les accès non autorisés, la perte, l'utilisation abusive, l'altération ou la divulgation.",
        content2:
          "Les données ne sont conservées que pendant la durée nécessaire à la réalisation des finalités décrites dans cette Politique ou selon les exigences de la loi.",
      },
      rights: {
        title: "6. Droits de l'Utilisateur",
        intro: "Conformément à la LGPD, l'utilisateur peut à tout moment demander :",
        items: [
          "La confirmation de l'existence d'un traitement de données",
          "L'accès à ses données personnelles",
          "La rectification de données incomplètes, inexactes ou obsolètes",
          "La suppression des données, lorsque cela est applicable",
          "Des informations sur le partage des données",
          "Le retrait du consentement, lorsque cela est applicable",
        ],
        howTo: "Les demandes doivent être effectuées via l'adresse e-mail officielle :",
      },
      communications: {
        title: "7. Communications",
        intro: "Educly peut envoyer des communications liées à :",
        items: [
          "Le compte utilisateur",
          "L'abonnement et la facturation",
          "Les mises à jour opérationnelles et légales",
        ],
        optOut: "L'utilisateur peut choisir de ne pas recevoir de communications promotionnelles, lorsque cela est applicable.",
      },
      cookies: {
        title: "8. Utilisation des Cookies et Technologies Similaires",
        intro: "Educly peut utiliser des cookies et des technologies similaires pour :",
        items: [
          "Améliorer les fonctionnalités de l'application",
          "Analyser les métriques d'utilisation",
          "Améliorer l'expérience utilisateur",
        ],
        disclaimer:
          "L'utilisation de ces technologies respecte la législation applicable et les paramètres de l'appareil de l'utilisateur.",
      },
      changes: {
        title: "9. Modifications de cette Politique",
        content1: "Cette Politique de Confidentialité peut être mise à jour à tout moment.",
        content2: "Les modifications importantes seront communiquées via l'application ou les canaux officiels.",
        content3: "L'utilisation continue de la plateforme après ces modifications implique l'acceptation de la nouvelle version.",
      },
      contact: {
        title: "10. Contact",
        intro:
          "En cas de questions, de demandes ou d'exercice de droits liés à la vie privée et à la protection des données, l'utilisateur doit nous contacter exclusivement par e-mail :",
      },
    },
  },
  de: {
    title: "Datenschutzerklärung - Educly",
    lastUpdated: "Zuletzt aktualisiert: Januar 2025",
    intro:
      "Diese Datenschutzerklärung beschreibt, wie Educly personenbezogene Daten von Nutzern erhebt, verwendet, speichert, weitergibt und schützt, die auf die Plattform zugreifen und sie nutzen, im Einklang mit dem geltenden Recht, insbesondere dem brasilianischen Gesetz Nr. 13.709/2018 - dem Allgemeinen Gesetz zum Schutz personenbezogener Daten (LGPD). Durch die Nutzung der Educly-App erklärt der Nutzer, dass er diese Datenschutzerklärung gelesen, verstanden und akzeptiert hat.",
    sections: {
      collection: {
        title: "1. Erhobene Daten",
        intro: "Educly kann je nach Interaktion des Nutzers mit der Plattform die folgenden personenbezogenen Daten erheben:",
        directData: {
          title: "1.1. Direkt vom Nutzer bereitgestellte Daten",
          intro: "",
          items: [
            "Name",
            "E-Mail-Adresse",
            "Registrierungs- und Anmeldedaten",
            "Informationen, die in der Kommunikation mit dem Support bereitgestellt werden",
          ],
        },
        paymentData: {
          title: "1.2. Zahlungsdaten",
          content1:
            "Zahlungsdaten werden ausschließlich von zertifizierten und sicheren Zahlungsdienstleistern und Drittplattformen verarbeitet.",
          content2:
            "Educly speichert keine sensiblen Kreditkartendaten wie die vollständige Nummer, den Sicherheitscode oder das Ablaufdatum.",
        },
        autoData: {
          title: "1.3. Automatisch erhobene Daten",
          intro: "",
          items: [
            "IP-Adresse",
            "Informationen über das Gerät, das Betriebssystem und die App-Version",
            "Zugriffsprotokolle sowie Datum und Uhrzeit der Nutzung",
            "Nutzungs- und Interaktionsdaten auf der Plattform",
          ],
        },
      },
      usage: {
        title: "2. Zweck der Datennutzung",
        intro: "Die erhobenen Daten werden für folgende Zwecke verwendet:",
        items: [
          "Den Zugriff auf die App und ihren Betrieb zu ermöglichen",
          "Abonnements, Abrechnungen und den Zugriff auf Inhalte zu verwalten",
          "Erstattungsanfragen zu bearbeiten",
          "Anfragen zur Kündigung oder Pausierung des Abonnements zu bearbeiten",
          "Betriebliche und administrative Mitteilungen zu versenden",
          "Die Nutzererfahrung und die Servicequalität zu verbessern",
          "Gesetzliche und regulatorische Verpflichtungen zu erfüllen",
        ],
      },
      legalBasis: {
        title: "3. Rechtsgrundlage der Datenverarbeitung",
        intro: "Educly verarbeitet personenbezogene Daten auf Grundlage der folgenden in der LGPD vorgesehenen Rechtsgrundlagen:",
        items: [
          "Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen",
          "Erfüllung einer gesetzlichen oder regulatorischen Verpflichtung",
          "Einwilligung der betroffenen Person, sofern anwendbar",
          "Berechtigtes Interesse unter Wahrung der Rechte und Freiheiten des Nutzers",
        ],
      },
      sharing: {
        title: "4. Weitergabe von Daten",
        intro: "Educly kann personenbezogene Daten nur dann weitergeben, wenn dies erforderlich ist, an:",
        items: [
          "Zahlungsplattformen und Finanzdienstleister",
          "Technologie- und Hosting-Dienstleister",
          "Analyse-, Metrik- und Support-Tools",
          "Öffentliche Stellen, wenn dies gesetzlich oder durch gerichtliche Anordnung vorgeschrieben ist",
        ],
        disclaimer:
          "Die Weitergabe erfolgt stets innerhalb der gesetzlichen und vertraglichen Grenzen, um die ordnungsgemäße Erbringung der Dienste sicherzustellen.",
      },
      security: {
        title: "5. Speicherung und Sicherheit der Daten",
        content1:
          "Educly trifft angemessene technische und organisatorische Maßnahmen, um personenbezogene Daten vor unbefugtem Zugriff, Verlust, Missbrauch, Veränderung oder Offenlegung zu schützen.",
        content2:
          "Die Daten werden nur so lange gespeichert, wie es zur Erfüllung der in dieser Richtlinie beschriebenen Zwecke oder gesetzlich erforderlich ist.",
      },
      rights: {
        title: "6. Rechte des Nutzers",
        intro: "Nach der LGPD kann der Nutzer jederzeit Folgendes verlangen:",
        items: [
          "Bestätigung, ob eine Datenverarbeitung stattfindet",
          "Zugang zu seinen personenbezogenen Daten",
          "Berichtigung unvollständiger, unrichtiger oder veralteter Daten",
          "Löschung von Daten, sofern anwendbar",
          "Informationen über die Weitergabe von Daten",
          "Widerruf der Einwilligung, sofern anwendbar",
        ],
        howTo: "Anfragen müssen über die offizielle E-Mail-Adresse gestellt werden:",
      },
      communications: {
        title: "7. Kommunikation",
        intro: "Educly kann Mitteilungen senden, die sich beziehen auf:",
        items: [
          "Das Nutzerkonto",
          "Abonnement und Abrechnung",
          "Betriebliche und rechtliche Aktualisierungen",
        ],
        optOut: "Der Nutzer kann den Erhalt von Werbemitteilungen ablehnen, sofern dies anwendbar ist.",
      },
      cookies: {
        title: "8. Verwendung von Cookies und ähnlichen Technologien",
        intro: "Educly kann Cookies und ähnliche Technologien verwenden, um:",
        items: [
          "Die Funktionalität der App zu verbessern",
          "Nutzungsmetriken zu analysieren",
          "Die Nutzererfahrung zu verbessern",
        ],
        disclaimer:
          "Die Verwendung dieser Technologien erfolgt unter Beachtung des geltenden Rechts und der Geräteeinstellungen des Nutzers.",
      },
      changes: {
        title: "9. Änderungen dieser Richtlinie",
        content1: "Diese Datenschutzerklärung kann jederzeit aktualisiert werden.",
        content2: "Wesentliche Änderungen werden über die App oder offizielle Kanäle mitgeteilt.",
        content3: "Die fortgesetzte Nutzung der Plattform nach den Änderungen bedeutet die Zustimmung zur neuen Version.",
      },
      contact: {
        title: "10. Kontakt",
        intro:
          "Bei Fragen, Anfragen oder zur Ausübung von Rechten in Bezug auf Datenschutz und Privatsphäre muss der Nutzer uns ausschließlich über die E-Mail-Adresse kontaktieren:",
      },
    },
  },
  it: {
    title: "Informativa sulla Privacy - Educly",
    lastUpdated: "Ultimo aggiornamento: gennaio 2025",
    intro:
      "La presente Informativa sulla Privacy descrive come Educly raccoglie, utilizza, conserva, condivide e protegge i dati personali degli utenti che accedono e utilizzano la piattaforma, in conformità alla normativa applicabile, in particolare alla Legge n. 13.709/2018 - Legge generale brasiliana sulla protezione dei dati (LGPD). Utilizzando l'app Educly, l'utente dichiara di aver letto, compreso e accettato la presente Informativa sulla Privacy.",
    sections: {
      collection: {
        title: "1. Dati Raccolti",
        intro: "Educly può raccogliere i seguenti dati personali, in base all'interazione dell'utente con la piattaforma:",
        directData: {
          title: "1.1. Dati forniti direttamente dall'utente",
          intro: "",
          items: [
            "Nome",
            "Indirizzo e-mail",
            "Dati di registrazione e accesso",
            "Informazioni fornite nelle comunicazioni con l'assistenza",
          ],
        },
        paymentData: {
          title: "1.2. Dati di pagamento",
          content1:
            "I dati di pagamento sono trattati esclusivamente da operatori e piattaforme di pagamento di terze parti, certificati e sicuri.",
          content2:
            "Educly non memorizza dati sensibili della carta di credito, come il numero completo, il codice di sicurezza o la data di scadenza.",
        },
        autoData: {
          title: "1.3. Dati raccolti automaticamente",
          intro: "",
          items: [
            "Indirizzo IP",
            "Informazioni sul dispositivo, sul sistema operativo e sulla versione dell'app",
            "Registri di accesso, data e ora di utilizzo",
            "Dati di navigazione e interazione sulla piattaforma",
          ],
        },
      },
      usage: {
        title: "2. Finalità dell'Uso dei Dati",
        intro: "I dati raccolti vengono utilizzati per le seguenti finalità:",
        items: [
          "Consentire l'accesso e il funzionamento dell'app",
          "Gestire abbonamenti, addebiti e accesso ai contenuti",
          "Elaborare richieste di rimborso",
          "Gestire richieste di cancellazione o sospensione dell'abbonamento",
          "Inviare comunicazioni operative e amministrative",
          "Migliorare l'esperienza dell'utente e la qualità dei servizi",
          "Adempiere agli obblighi legali e normativi",
        ],
      },
      legalBasis: {
        title: "3. Base Giuridica del Trattamento dei Dati",
        intro: "Educly tratta i dati personali sulla base delle seguenti basi giuridiche previste dalla LGPD:",
        items: [
          "Esecuzione di un contratto o di procedure preliminari",
          "Adempimento di un obbligo legale o normativo",
          "Consenso dell'interessato, quando applicabile",
          "Legittimo interesse, nel rispetto dei diritti e delle libertà dell'utente",
        ],
      },
      sharing: {
        title: "4. Condivisione dei Dati",
        intro: "Educly può condividere dati personali solo quando necessario, con:",
        items: [
          "Piattaforme di pagamento e operatori finanziari",
          "Fornitori di servizi tecnologici e di hosting",
          "Strumenti di analisi, metriche e supporto",
          "Autorità pubbliche, in caso di obbligo legale o ordine giudiziario",
        ],
        disclaimer:
          "La condivisione avviene sempre entro i limiti legali e contrattuali, al fine di garantire la corretta prestazione dei servizi.",
      },
      security: {
        title: "5. Conservazione e Sicurezza dei Dati",
        content1:
          "Educly adotta misure tecniche e organizzative ragionevoli per proteggere i dati personali da accessi non autorizzati, perdita, uso improprio, alterazione o divulgazione.",
        content2:
          "I dati vengono conservati solo per il tempo necessario a soddisfare le finalità descritte in questa Informativa o come richiesto dalla legge.",
      },
      rights: {
        title: "6. Diritti dell'Utente",
        intro: "Ai sensi della LGPD, l'utente può richiedere in qualsiasi momento:",
        items: [
          "Conferma dell'esistenza del trattamento dei dati",
          "Accesso ai propri dati personali",
          "Correzione di dati incompleti, inesatti o non aggiornati",
          "Cancellazione dei dati, quando applicabile",
          "Informazioni sulla condivisione dei dati",
          "Revoca del consenso, quando applicabile",
        ],
        howTo: "Le richieste devono essere inviate tramite l'indirizzo e-mail ufficiale:",
      },
      communications: {
        title: "7. Comunicazioni",
        intro: "Educly può inviare comunicazioni relative a:",
        items: [
          "L'account dell'utente",
          "L'abbonamento e gli addebiti",
          "Aggiornamenti operativi e legali",
        ],
        optOut: "L'utente può scegliere di non ricevere comunicazioni promozionali, quando applicabile.",
      },
      cookies: {
        title: "8. Uso di Cookie e Tecnologie Simili",
        intro: "Educly può utilizzare cookie e tecnologie simili per:",
        items: [
          "Migliorare la funzionalità dell'app",
          "Analizzare le metriche di utilizzo",
          "Migliorare l'esperienza dell'utente",
        ],
        disclaimer:
          "L'uso di queste tecnologie rispetta la normativa applicabile e le impostazioni del dispositivo dell'utente.",
      },
      changes: {
        title: "9. Modifiche alla Presente Informativa",
        content1: "La presente Informativa sulla Privacy può essere aggiornata in qualsiasi momento.",
        content2: "Le modifiche rilevanti saranno comunicate tramite l'app o attraverso i canali ufficiali.",
        content3: "L'uso continuato della piattaforma dopo le modifiche implica l'accettazione della nuova versione.",
      },
      contact: {
        title: "10. Contatto",
        intro:
          "In caso di dubbi, richieste o esercizio di diritti relativi alla privacy e alla protezione dei dati, l'utente deve contattarci esclusivamente tramite l'indirizzo e-mail:",
      },
    },
  },
  ru: {
    title: "Политика конфиденциальности - Educly",
    lastUpdated: "Последнее обновление: январь 2025",
    intro:
      "Настоящая Политика конфиденциальности описывает, как Educly собирает, использует, хранит, передает и защищает персональные данные пользователей, которые получают доступ к платформе и используют ее, в соответствии с применимым законодательством, особенно Законом Бразилии № 13.709/2018 - Общим законом о защите данных (LGPD). Используя приложение Educly, пользователь подтверждает, что прочитал, понял и согласился с настоящей Политикой конфиденциальности.",
    sections: {
      collection: {
        title: "1. Собираемые данные",
        intro: "Educly может собирать следующие персональные данные в зависимости от того, как пользователь взаимодействует с платформой:",
        directData: {
          title: "1.1. Данные, предоставляемые пользователем напрямую",
          intro: "",
          items: [
            "Имя",
            "Адрес электронной почты",
            "Данные регистрации и входа",
            "Информация, предоставленная в общении со службой поддержки",
          ],
        },
        paymentData: {
          title: "1.2. Платежные данные",
          content1:
            "Платежные данные обрабатываются исключительно сертифицированными и безопасными сторонними платежными операторами и платформами.",
          content2:
            "Educly не хранит чувствительные данные банковских карт, такие как полный номер, код безопасности или срок действия.",
        },
        autoData: {
          title: "1.3. Данные, собираемые автоматически",
          intro: "",
          items: [
            "IP-адрес",
            "Информация об устройстве, операционной системе и версии приложения",
            "Журналы доступа, дата и время использования",
            "Данные навигации и взаимодействия на платформе",
          ],
        },
      },
      usage: {
        title: "2. Цели использования данных",
        intro: "Собираемые данные используются в следующих целях:",
        items: [
          "Обеспечить доступ к приложению и его работу",
          "Управлять подписками, платежами и доступом к контенту",
          "Обрабатывать запросы на возврат средств",
          "Обрабатывать запросы на отмену или приостановку подписки",
          "Отправлять операционные и административные сообщения",
          "Улучшать пользовательский опыт и качество услуг",
          "Соблюдать правовые и нормативные обязательства",
        ],
      },
      legalBasis: {
        title: "3. Правовое основание обработки данных",
        intro: "Educly обрабатывает персональные данные на основе следующих правовых оснований, предусмотренных LGPD:",
        items: [
          "Исполнение договора или предварительных процедур",
          "Исполнение законной или нормативной обязанности",
          "Согласие субъекта данных, когда это применимо",
          "Законный интерес при уважении прав и свобод пользователя",
        ],
      },
      sharing: {
        title: "4. Передача данных",
        intro: "Educly может передавать персональные данные только при необходимости следующим сторонам:",
        items: [
          "Платежным платформам и финансовым операторам",
          "Поставщикам технологических и хостинг-услуг",
          "Инструментам аналитики, метрик и поддержки",
          "Государственным органам, когда это требуется законом или решением суда",
        ],
        disclaimer:
          "Передача всегда осуществляется в пределах закона и договорных обязательств для надлежащего оказания услуг.",
      },
      security: {
        title: "5. Хранение и безопасность данных",
        content1:
          "Educly применяет разумные технические и организационные меры для защиты персональных данных от несанкционированного доступа, утраты, злоупотребления, изменения или раскрытия.",
        content2:
          "Данные хранятся только столько времени, сколько необходимо для достижения целей, описанных в настоящей Политике, или в соответствии с требованиями закона.",
      },
      rights: {
        title: "6. Права пользователя",
        intro: "В соответствии с LGPD пользователь может в любое время запросить:",
        items: [
          "Подтверждение наличия обработки данных",
          "Доступ к своим персональным данным",
          "Исправление неполных, неточных или устаревших данных",
          "Удаление данных, когда это применимо",
          "Информацию о передаче данных",
          "Отзыв согласия, когда это применимо",
        ],
        howTo: "Запросы должны направляться на официальный адрес электронной почты:",
      },
      communications: {
        title: "7. Коммуникации",
        intro: "Educly может направлять сообщения, связанные с:",
        items: [
          "Учетной записью пользователя",
          "Подпиской и платежами",
          "Операционными и правовыми обновлениями",
        ],
        optOut: "Пользователь может отказаться от получения рекламных сообщений, когда это применимо.",
      },
      cookies: {
        title: "8. Использование файлов cookie и похожих технологий",
        intro: "Educly может использовать файлы cookie и похожие технологии для того, чтобы:",
        items: [
          "Улучшать функциональность приложения",
          "Анализировать метрики использования",
          "Улучшать пользовательский опыт",
        ],
        disclaimer:
          "Использование этих технологий осуществляется в соответствии с применимым законодательством и настройками устройства пользователя.",
      },
      changes: {
        title: "9. Изменения в этой Политике",
        content1: "Настоящая Политика конфиденциальности может быть обновлена в любое время.",
        content2: "Существенные изменения будут сообщены через приложение или официальные каналы.",
        content3: "Продолжение использования платформы после изменений означает согласие с новой версией.",
      },
      contact: {
        title: "10. Контакт",
        intro:
          "В случае вопросов, запросов или реализации прав, связанных с конфиденциальностью и защитой данных, пользователь должен связаться с нами исключительно по электронной почте:",
      },
    },
  },
};

export const getPrivacyPolicyContent = (language?: string): PrivacyPolicyContent => {
  const normalizedLanguage = language?.split("-")[0]?.toLowerCase() ?? "en";
  return privacyPolicyTranslations[normalizedLanguage] ?? privacyPolicyTranslations.en;
};
