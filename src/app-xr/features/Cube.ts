import * as THREE from "three";
import { Mesh } from "three";

export class Cube {
  readonly materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  ];

  readonly shape: Mesh;

  constructor() {
    this.shape = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      this.materials
    );

    this.shape.position.set(1, 1, 1);
  }
}
