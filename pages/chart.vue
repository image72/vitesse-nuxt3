<script setup>
import { VueFlow, useVueFlow, Panel, PanelPosition } from '@vue-flow/core'
import { nextTick, watch } from 'vue'
// import Sidebar from './Sidebar.vue'
import "~/styles/vueflow.scss";
const flowKey = 'example-flow'

// const { nodes, addNodes, setNodes, setEdges, dimensions, setTransform, toObject } = useVueFlow();

definePageMeta({
  layout: 'blank'
})

let id = 0;
function getId() {
  return `dndnode_${id++}`;
}

const flowList = reactive([
  {
    id: '1',
    type: 'input',
    label: 'input node',
    position: { x: 250, y: 25 },
  },
]);

const { findNode, onConnect, addEdges, addNodes, setNodes, project, vueFlowRef } = useVueFlow()

function onDragOver(event) {
  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
}

onConnect((params) => addEdges(params));

function onDrop(event) {
  const type = event.dataTransfer?.getData('application/vueflow');

  const { left, top } = vueFlowRef.value.getBoundingClientRect();

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  });

  const newNode = {
    id: getId(),
    type,
    position,
    label: `${type} node`,
  };

  addNodes([newNode]);

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(newNode.id);
    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 }
          stop()
        }
      },
      { deep: true, flush: 'post' },
    );
  })
}

const handleNodeClick = ({event, node}) => {
  console.log('click node', event, node);
}

const handleNodeMouseEnter = ({event, node}) => {
  console.log('mouseenter node', event, node);
}

const handleEdgeClick = ({event, edge}) => {
  console.log('click edge', event, edge);
}

const handleEdgeMouseEnter = ({event, edge}) => {
  console.log('mouseenter node', event, edge);
}

</script>

<template>
  <div class="dndflow" @drop="onDrop">
    <div class="props-panel">properties</div>
    <VueFlow fit-view-on-init v-model="flowList"
      @dragover="onDragOver"
      @nodeClick="handleNodeClick"
      @nodeMouseEnter="handleNodeMouseEnter"
      @edgeClick="handleEdgeClick"
      @edgeMouseEnter="handleEdgeMouseEnter"
    />
    <FlowSidebar />
  </div>
</template>