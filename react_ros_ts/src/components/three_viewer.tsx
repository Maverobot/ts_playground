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
  }

  renderer: THREE.WebGLRenderer;

  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      this.props.width / this.props.height,
      0.1,
      1000
    );
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
    camera.position.z = 5;

    let rendererRef = this.renderer;
    var animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      rendererRef.render(scene, camera);
    };
    animate();
  }

  componentDidUpdate() {
    this.renderer.setSize(this.props.width, this.props.height);
  }

  render() {
    return <div id="canvas" />;
  }
}

export default ThreeViewer;
