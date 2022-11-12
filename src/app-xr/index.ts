import { Scene, WebGLRenderer, PerspectiveCamera } from "three";
import { pipeAsync } from "../lib/helpers/functions";
import { Cube } from "./features/Cube";
import { bind } from "../lib/decorators/bind";

export class AppXR {
  private root: HTMLElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGLRenderingContext | null = null;
  private scene: Scene | null = null;
  private renderer: WebGLRenderer | null = null;
  private camera: PerspectiveCamera | null = null;
  private session: XRSession | null = null;
  private referenceSpace: XRReferenceSpace | XRBoundedReferenceSpace | null =
    null;

  constructor(
    readonly options: {
      root: string;
    }
  ) {}

  @bind
  async start() {
    try {
      console.log(this);

      await pipeAsync(
        this._initRoot,
        this._initCanvas,
        this._initScene,
        this._initGl,
        this._initRenderer,
        this._initCamera,
        this._initSession,
        this._initReferenceSpace,
      )(this.options.root);

      this.session?.requestAnimationFrame(this._onFrame);
    } catch (e) {
      console.error(e);
    }
  }

  @bind
  private _initRoot(rootSelector: string) {
    this.root = document.querySelector(rootSelector);
  }

  @bind
  private _initCanvas() {
    this.canvas = document.createElement("canvas");
    this.root?.appendChild(this.canvas);
  }

  @bind
  private async _initGl() {
    this.gl = this.canvas!.getContext("webgl", { xrCompatible: true })!;
  }

  @bind
  private async _initScene() {
    this.scene = new Scene();
  }

  @bind
  private async _initRenderer() {
    this.renderer = new WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      canvas: this.canvas!,
      context: this.gl!,
    });
    this.renderer.autoClear = false;
  }

  @bind
  private async _initCamera() {
    this.camera = new PerspectiveCamera();
    this.camera.matrixAutoUpdate = true;
  }

  @bind
  private async _initSession() {
    this.session = await navigator.xr!.requestSession("immersive-ar");
    this.session.updateRenderState({
      baseLayer: new XRWebGLLayer(this.session, this.gl!),
    });
  }

  @bind
  private async _initReferenceSpace() {
    this.referenceSpace = await this.session!.requestReferenceSpace("local");
  }

  @bind
  addCube() {
    this.scene?.add(new Cube().shape);
  }

  @bind
  private _onFrame(_time: DOMHighResTimeStamp, frame: XRFrame) {
    // Queue up the next draw request.
    this.session!.requestAnimationFrame(this._onFrame);

    // Bind the graphics framebuffer to the baseLayer's framebuffer
    this.gl!.bindFramebuffer(
      this.gl!.FRAMEBUFFER,
      this.session!.renderState?.baseLayer!.framebuffer
    );

    // Retrieve the pose of the device.
    // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
    const pose = frame!.getViewerPose(this.referenceSpace!);
    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];

      const viewport = this.session!.renderState?.baseLayer!.getViewport(view);
      this.renderer!.setSize(viewport!.width, viewport!.height);

      // Use the view's transform matrix and projection matrix to configure the THREE.camera.
      this.camera!.matrix.fromArray(view.transform.matrix);
      this.camera!.projectionMatrix.fromArray(view.projectionMatrix);
      this.camera!.updateMatrixWorld(true);

      // Render the scene with THREE.WebGLRenderer.
      this.renderer!.render(this.scene!, this.camera!);
    }
  }
}
