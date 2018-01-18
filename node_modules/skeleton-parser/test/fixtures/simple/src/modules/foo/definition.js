module.exports = {
    group: "skeleton",
    fields: [
      {
        name: "color",
        options: {
          link: "Colors"
        }
      },
      {
        name: "text",
        default: ""
      },
      {
        name: "container",
        type: "select",
        options: {
          options: ["medium", "small", "spaceless", "left-aligned"]
        },
        default: ""
      },
      {
        name: "lead",
        default: false
      }
    ]
  };
  