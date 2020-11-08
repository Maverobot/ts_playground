import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

interface Props {
  width: number;
  height: number;
}

class ThreeViewer extends Component<Props> {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      this.props.width / this.props.height,
      0.1,
      1000
    );
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.props.width, this.props.height);
    let container = document.getElementById('canvas');
    if (!container) {
      return;
    }
    container.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return <div id="canvas" />;
  }
}

export default ThreeViewer;
