import React, { Component } from 'react';
import * as THREE from 'three';

interface Props {
  width: number;
  height: number;
}

class ThreeViewer extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.props.width / this.props.height,
      0.1,
      1000
    );
  }

  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;

  componentDidMount() {
    let scene = new THREE.Scene();
    this.renderer.setSize(this.props.width, this.props.height);
    let container = document.getElementById('canvas');
    if (!container) {
      console.warn("cannot find an element named 'canvas'");
      return;
    }
    container.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    this.camera.position.z = 5;

    let rendererRef = this.renderer;
    let cameraRef = this.camera;
    let animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      rendererRef.render(scene, cameraRef);
    };
    animate();
  }

  componentDidUpdate() {
    this.camera.aspect = this.props.width / this.props.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.props.width, this.props.height);
  }

  render() {
    return <div id="canvas" />;
  }
}

export default ThreeViewer;
