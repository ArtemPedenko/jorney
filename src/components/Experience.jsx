import {
  Clouds,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
  Text,
} from "@react-three/drei";
import { Background } from "./Background.jsx";
import Ship from "./Ship.jsx";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import Ocean from "./Ocean.jsx";
import { useFrame } from "@react-three/fiber";
import { Euler, Vector3 } from "three";
import { Cloud } from "./Cloud.jsx";
import { TextComponent } from "./TextComponent.jsx";

const LINE_NB_POINTS = 20000;
export const Experience = () => {
  const textSections = useMemo(() => {
    return [
      {
        position: new Vector3(-3, 1, -30),
        title: "Services",
        subtitle: `Welcome to Wawatmos,
Have a seat and enjoy the ride!`,
        image: "./images/bulkerImage.jpg",
      },
      {
        position: new Vector3(-3, 1, -100),
        title: "Services",
        subtitle: `Welcome to Wawatmos,
Have a seat and enjoy the ride!`,
      },
      {
        position: new Vector3(-3, 1, -150),
        title: "Services",
        subtitle: `Welcome to Wawatmos,
Have a seat and enjoy the ride!`,
      },
      {
        position: new Vector3(-3, 1, -350),
        title: "Services",
        subtitle: `Welcome to Wawatmos,
Have a seat and enjoy the ride!`,
      },
    ];
  }, []);

  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd",
  });

  const CURVE_DISTANCE = 350;
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -CURVE_DISTANCE),
        // new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
        // new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
        // new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
        // new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
        // new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
        new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const clouds = useMemo(
    () => [
      // STARTING
      {
        position: new Vector3(-3.5, 4, -10),
      },
      /*    {
        position: new Vector3(3.5, 4, -10),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(5, 4, -68),
        rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
      }, */
      /* {
        scale: new Vector3(2.5, 2.5, 2.5),
        position: new Vector3(10, 5, -52),
      },
      // FIRST POINT
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(curvePoints[1].x + 10, 4, curvePoints[1].z + 64),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[1].x - 20, 4, curvePoints[1].z + 28),
        rotation: new Euler(0, Math.PI / 7, 0),
      },
      {
        rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(curvePoints[1].x - 13, 4, curvePoints[1].z - 62),
      },
      {
        rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(curvePoints[1].x + 54, 4, curvePoints[1].z - 82),
      },
      {
        scale: new Vector3(5, 5, 5),
        position: new Vector3(curvePoints[1].x + 8, 4, curvePoints[1].z - 22),
      },
      // SECOND POINT
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[2].x + 6, 4, curvePoints[2].z + 50),
      },
      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(curvePoints[2].x - 2, 4, curvePoints[2].z - 26),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(curvePoints[2].x + 12, 4, curvePoints[2].z - 86),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[3].x + 3, 4, curvePoints[3].z + 50),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[3].x - 10, 4, curvePoints[3].z + 30),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(curvePoints[3].x - 20, 4, curvePoints[3].z - 8),
        rotation: new Euler(Math.PI, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(5, 5, 5),
        position: new Vector3(curvePoints[3].x + 0, 4, curvePoints[3].z - 98),
        rotation: new Euler(0, Math.PI / 3, 0),
      },
      // FOURTH POINT
      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(curvePoints[4].x + 3, 4, curvePoints[4].z + 2),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[4].x + 24, 4, curvePoints[4].z - 42),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[4].x - 4, 4, curvePoints[4].z - 62),
        rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
      },
      // FINAL
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[7].x + 12, 4, curvePoints[7].z + 60),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(curvePoints[7].x - 12, 4, curvePoints[7].z + 120),
        rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(curvePoints[7].x, 4, curvePoints[7].z),
        rotation: new Euler(0, 0, 0),
      }, */
    ],
    []
  );

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();

  const scroll = useScroll();
  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  return (
    <>
      {/*<OrbitControls enableZoom={false} />*/}
      {/*  включить/выключить свободную камеру*/}
      <OrbitControls />
      <group ref={cameraGroup}>
        <Background backgroundColors={backgroundColors} />
        <PerspectiveCamera position={[0, 0.05, 1]} fov={25} makeDefault />

        {/*кораблик*/}
        <Float floatIntensity={0.0000000001} speed={1}>
          <Ship
            rotation-y={Math.PI}
            scale={[0.2, 0.2, 0.2]}
            position-y={-0.01}
          />
        </Float>
      </group>
      {/* текст */}
      {textSections.map((textSection, index) => (
        <TextComponent {...textSection} key={index} />
      ))}
      {/*океан*/}
      <group>
        {/* <Ocean
          scale={[1, 0.001, 1]}
          position-y={-0.09}
          position-z={-30.2}
          position-x={-2}
        /> */}
        {/* {Array.from({ length: 1000 }).map((item, index) => {
          return (
            <Ocean
              key={index}
              scale={[0.009, 0.00025, 0.0006]}
              position-y={-0.05}
              position-z={-index}
              position-x={0}
            />
          );
        })} */}
        <Ocean
          scale={[0.001, 0.00025, 0.0006]}
          position-y={-0.05}
          position-z={0}
          position-x={0}
        />
        {/* <Ocean
          scale={[0.001, 0.00025, 0.0006]}
          position-y={-0.05}
          position-z={-1}
          position-x={0}
        />
        <Ocean
          scale={[0.001, 0.00025, 0.0006]}
          position-y={-0.05}
          position-z={-2}
          position-x={0}
        />
        <Ocean
          scale={[0.001, 0.00025, 0.0006]}
          position-y={-0.05}
          position-z={-3}
          position-x={0}
        /> */}
      </group>

      {/*линия*/}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"black"} opacity={0.7} transparent />
        </mesh>
      </group>
      {/*облака*/}
      {clouds.map((cloud, index) => (
        <Cloud {...cloud} key={index} />
      ))}
      {/*<Clouds material={THREE.MeshBasicMaterial}>*/}
      {/*  <Cloud*/}
      {/*    opacity={1}*/}
      {/*    scale={[0.3, 0.3, 0.3]}*/}
      {/*    position={[1, 5, -100]}*/}
      {/*    segments={40}*/}
      {/*    bounds={[10, 2, 2]}*/}
      {/*    volume={10}*/}
      {/*    color="white"*/}
      {/*  />*/}
      {/*  <Cloud*/}
      {/*    scale={[0.3, 0.3, 0.3]}*/}
      {/*    position={[-10, 5, -80]}*/}
      {/*    segments={40}*/}
      {/*    bounds={[10, 2, 2]}*/}
      {/*    volume={10}*/}
      {/*    color="white"*/}
      {/*  />*/}
      {/*  <Cloud*/}
      {/*    scale={[0.3, 0.3, 0.3]}*/}
      {/*    position={[10, 5, -50]}*/}
      {/*    segments={40}*/}
      {/*    bounds={[10, 2, 2]}*/}
      {/*    volume={10}*/}
      {/*    color="white"*/}
      {/*  />*/}
      {/*  <Cloud*/}
      {/*    scale={[0.3, 0.3, 0.3]}*/}
      {/*    position={[-5, 5, -30]}*/}
      {/*    segments={40}*/}
      {/*    bounds={[10, 2, 2]}*/}
      {/*    volume={10}*/}
      {/*    color="white"*/}
      {/*  />*/}
      {/*  <Cloud*/}
      {/*    scale={[0.3, 0.3, 0.3]}*/}
      {/*    position={[5, 5, -10]}*/}
      {/*    segments={40}*/}
      {/*    bounds={[10, 2, 2]}*/}
      {/*    volume={10}*/}
      {/*    color="white"*/}
      {/*  />*/}
      {/*</Clouds>*/}
    </>
  );
};
