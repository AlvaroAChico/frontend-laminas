export const configBasicPlan = {
  plan: {
    id: "1p93djq211",
    name: "basico",
  },
  functionallities: {
    general: [
      {
        function: "FUNC_DOWNLOAD_SIZE",
        description: "Lista de tamaños de descargas permitidos",
        enabled: true,
        amount: null,
        formats: ["A4"],
        fonts: null,
        unlimited: null,
      },
    ],
    images: [
      {
        function: "FUNC_LIST_SHEETS",
        description: "Lista de láminas",
        enabled: true,
        amount: null,
        formats: null,
        fonts: null,
        unlimited: null,
      },
      {
        function: "FUNC_UPLOAD_IMAGE",
        description: "Subir imagenes desde el ordenador",
        enabled: true,
        amount: null,
        formats: ["JPG"],
        fonts: null,
        unlimited: null,
      },
    ],
    text: [
      {
        function: "FUNC_LIST_FONTS",
        description: "Lista de fuentes permitidas",
        enabled: true,
        amount: null,
        formats: null,
        fonts: ["ARIAL"],
        unlimited: null,
      },
    ],
    figures: [
      {
        function: "FUNC_ADD_FIGURE",
        description: "Agregar figuras geométricas básicas",
        enabled: true,
        amount: null,
        formats: ["CIRCLE", "RECT", "TRIANGLE"],
        fonts: null,
        unlimited: null,
      },
    ],
    arturito: [
      {
        function: "FUNC_CONSULTING",
        description: "Funcionalidad de realizar consultas con Arturito",
        enabled: true,
        amount: 5,
        formats: null,
        fonts: null,
        unlimited: true,
      },
    ],
    downloads: [
      {
        function: "FUNC_DOWNLOADS",
        description: "Realizar descargas en diferentes formatos",
        enabled: true,
        amount: 5,
        formats: ["PNG"],
        fonts: null,
        unlimited: null,
      },
    ],
  },
};

// -----------------------------------------------------------------------

export const configMediumPlan = {
  plan: {
    id: "g1130f302ip",
    name: "MEDIUM",
  },
  functionallities: {
    general: [
      {
        function: "FUNC_DOWNLOAD_SIZE",
        description: "Lista de tamaños de descargas permitidos",
        enabled: true,
        amount: null,
        formats: ["A4", "A3"],
        fonts: null,
        unlimited: null,
      },
    ],
    images: [
      {
        function: "FUNC_LIST_SHEETS",
        description: "Lista de láminas",
        enabled: true,
        amount: null,
        formats: null,
        fonts: null,
        unlimited: null,
      },
      {
        function: "FUNC_UPLOAD_IMAGE",
        description: "Subir imagenes desde el ordenador",
        enabled: true,
        amount: null,
        formats: ["PNG, JPG"],
        fonts: null,
        unlimited: null,
      },
    ],
    text: [
      {
        function: "FUNC_UPLOAD_IMAGE",
        description: "Subir imagenes desde el ordenador",
        enabled: true,
        amount: null,
        formats: null,
        fonts: ["ARIAL"],
        unlimited: null,
      },
    ],
    figures: [
      {
        function: "FUNC_ADD_FIGURE",
        description: "Agregar figuras geométricas básicas",
        enabled: true,
        amount: null,
        formats: ["CIRCLE", "RECT", "TRIANGLE"],
        fonts: null,
        unlimited: null,
      },
    ],
    arturito: [
      {
        function: "FUNC_CONSULTING",
        description: "Funcionalidad de realizar consultas con Arturito",
        enabled: true,
        amount: 30,
        formats: null,
        fonts: null,
        unlimited: true,
      },
    ],
    downloads: [
      {
        function: "FUNC_DOWNLOADS",
        description: "Realizar descargas en diferentes formatos",
        enabled: true,
        amount: 30,
        formats: ["PNG", "JPG"],
        fonts: null,
        unlimited: null,
      },
    ],
  },
};

// -----------------------------------------------------------------------

export const configPremiumPlan = {
  plan: {
    id: "913nt492",
    name: "PREMIUM",
  },
  functionallities: {
    general: [
      {
        function: "FUNC_DOWNLOAD_SIZE",
        description: "Lista de tamaños de descargas permitidos",
        enabled: true,
        amount: null,
        formats: ["A4", "A3", "OFICIO"],
        fonts: null,
        unlimited: null,
      },
    ],
    images: [
      {
        function: "FUNC_LIST_SHEETS",
        description: "Lista de láminas",
        enabled: true,
        amount: null,
        formats: null,
        fonts: null,
        unlimited: null,
      },
      {
        function: "FUNC_UPLOAD_IMAGE",
        description: "Subir imagenes desde el ordenador",
        enabled: true,
        amount: null,
        formats: ["PNG, JPG", "JPEG"],
        fonts: null,
        unlimited: null,
      },
    ],
    text: [
      {
        function: "FUNC_ADD_TEXT",
        description: "Agregar texto al editor",
        enabled: true,
        amount: null,
        formats: null,
        fonts: ["ARIAL", "TIMES NEW ROMAN"],
        unlimited: null,
      },
    ],
    figures: [
      {
        function: "FUNC_ADD_FIGURE",
        description: "Agregar figuras geométricas básicas",
        enabled: true,
        amount: null,
        formats: ["CIRCLE", "RECT", "TRIANGLE"],
        fonts: null,
        unlimited: null,
      },
    ],
    arturito: [
      {
        function: "FUNC_CONSULTING",
        description: "Funcionalidad de realizar consultas con Arturito",
        enabled: true,
        amount: 50,
        formats: null,
        fonts: null,
        unlimited: true,
      },
    ],
    downloads: [
      {
        function: "FUNC_DOWNLOADS",
        description: "Realizar descargas en diferentes formatos",
        enabled: true,
        amount: 30,
        formats: ["PNG", "PDF", "JPG"],
        fonts: null,
        unlimited: null,
      },
    ],
  },
};
