// refer to http://g6.antv.antgroup.com/en/manual/getting-started

import G6 from "@antv/g6";

// Set behavior for all tooltips
const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 20,
  getContent(e) {
    const outDiv = document.createElement("div");
    outDiv.style.width = "180px";
    outDiv.innerHTML = `
      <h4>${e.item.getModel().label}</h4>
      <ul>
        <li>${e.item.getModel().label || e.item.getModel().id}</li>
        <li>${e.item.getModel().note}</li>
      </ul>`;
    return outDiv;
  },
  itemTypes: ["node", "edge"]
});

// data needs to be in dictionary or JSON format {nodes, edges}
// list of nodes {id, label, x, y, note, style { } , etc }
// list of edges {source, target, note, style { lineWidth }, etc }

const data = {
  nodes: [
    {
      id: "node1",
      label: "Circle1",
      note: "This is node 1 <br> it is blue",
      x: 150,
      y: 150
    },
    {
      id: "node2",
      label: "Circle2",
      note: "This is node 2 <br> it is green",
      x: 400,
      y: 150
    },
    {
      id: "node3",
      label: "Circle3",
      note: "This is node 3 <br> it is blue",
      x: 400,
      y: 300
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      note: "This is edge 1 <br> hello",
      style: {
        lineWidth: 10
      }
    },
    {
      source: "node2",
      target: "node3",
      note: "This is edge 2 <br> hello",
      style: {
        lineWidth: 5
      }
    }
  ]
};

// instantiate the graph canvas

const graph = new G6.Graph({
  container: "container",
  width: 800,
  height: 500,
  defaultNode: {
    shape: "circle",
    size: [80],
    color: "#5B8FF9",
    style: {
      fill: "#9EC9FF",
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: "#fff",
        fontSize: 20
      }
    }
  },
  defaultEdge: {
    style: {
      stroke: "#e2e2e2",
      lineWidth: 2
    }
  },
  modes: {
    default: [
      {
        type: "zoom-canvas",
        minZoom: 0.4,
        maxZoom: 10
      },
      {
        type: "drag-canvas",
        direction: ["x", "y"]
      }
    ]
  },

  // The set of styles of nodes in different states
  nodeStateStyles: {
    // The node style when the state 'hover' is true
    hover: {
      fill: "lightsteelblue"
    },
    // The node style when the state 'click' is true
    click: {
      stroke: "#000",
      lineWidth: 3
    }
  },
  // The edge styles in different states
  edgeStateStyles: {
    // The edge style when the state 'click' is true
    click: {
      stroke: "steelblue"
    }
  },

  plugins: [tooltip] // Use Tooltip plugin
});

// For future use when adding mouse click/enter functions
// // Mouse enter a node
// graph.on("node:mouseenter", (e) => {
//   const nodeItem = e.item; // Get the target item
//   graph.setItemState(nodeItem, "hover", true); // Set the state 'hover' of the item to be true
// });

// // Mouse leave a node
// graph.on("node:mouseleave", (e) => {
//   const nodeItem = e.item; // Get the target item
//   graph.setItemState(nodeItem, "hover", false); // Set the state 'hover' of the item to be false
// });

// // Click a node
// graph.on("node:click", (e) => {
//   // Swich the 'click' state of the node to be false
//   const clickNodes = graph.findAllByState("node", "click");
//   clickNodes.forEach((cn) => {
//     graph.setItemState(cn, "click", false);
//   });
//   const nodeItem = e.item; // et the clicked item
//   graph.setItemState(nodeItem, "click", true); // Set the state 'click' of the item to be true
// });

// // Click an edge
// graph.on("edge:click", (e) => {
//   // Swich the 'click' state of the edge to be false
//   const clickEdges = graph.findAllByState("edge", "click");
//   clickEdges.forEach((ce) => {
//     graph.setItemState(ce, "click", false);
//   });
//   const edgeItem = e.item; // Get the clicked item
//   graph.setItemState(edgeItem, "click", true); // Set the state 'click' of the item to be true
// });

graph.data(data);
graph.render();
