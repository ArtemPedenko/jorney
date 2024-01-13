import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Ocean(props) {
  const { nodes, materials } = useGLTF("./models/ocean/ocean.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry} material={materials.Mat} />
    </group>
  );
}

useGLTF.preload("./models/ocean/ocean.glb");
