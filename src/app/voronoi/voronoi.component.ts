import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { Input, HostListener } from '@angular/core/src/metadata/directives';
import { VoronoiDiagram } from './voronoi-diagram';
import { VoronoiRenderer } from './voronoi-renderer';
import { AudioPlayerFactory } from '../audio/audio-player-factory';
import { PointerEventFactory } from '../pointer-event/pointer-event-factory';
import { PointerControl } from './pointer-control';
import { Point } from '../common/point';
import { Dimension } from '../common/dimension';
import { VoronoiBoard } from './voronoi-board';

@Component({
  selector: 'app-voronoi',
  templateUrl: './voronoi.component.html',
  styleUrls: ['./voronoi.component.css']
})
export class VoronoiComponent implements OnInit {

// Input
  @Input() board: any;

  // Attributes
  private diagram: VoronoiDiagram;
  private voronoiRenderer: VoronoiRenderer;
  private throttledResize;


  /**
   * @param elementRef
   * @param audioPlayerFactory
   * @param renderer
   */
  constructor(
      private elementRef: ElementRef,
      private audioPlayerFactory: AudioPlayerFactory,
      private renderer: Renderer,
      private pointerEventFactory: PointerEventFactory
  ) {}

  /**
   * On init
   * @returns {undefined}
   */
  ngOnInit():any {
    this.throttledResize = _.throttle(this.resizeHandler, 16);
  }

  /**
   * After view init
   */
  ngAfterViewInit():any {
    this.createDiagram();
    this.voronoiRenderer = new VoronoiRenderer(
        this.elementRef.nativeElement,
        this.diagram
    );
    this.voronoiRenderer.render();
  }

  ngOnDestroy():any {
    this.voronoiRenderer.stop();
  }


  /**
   * On Mouse move
   * @param event
   */
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onClick(event) {
    event.preventDefault();
    event.stopPropagation();

    // Remove clicked flag
    for(let cell of this.diagram.getVoronoiCells()) {
      cell.clicked = false;
    }

    // Absolute position
    let pointerEvent = this.pointerEventFactory.getPointerEvent(event);

    // Relative position
    var componentBoundingBox = this.elementRef.nativeElement.getBoundingClientRect();
    const x = pointerEvent.position.x - componentBoundingBox.left;
    const y = pointerEvent.position.y - componentBoundingBox.top;
    const relativeClickPosition = new Point(x, y);

    // Look for clicked cell
    const cell = this.diagram.getVoronoiCellAtPosition(relativeClickPosition);
    if( ! cell) {
      return;
    }

    const pointerControl = new PointerControl(
        cell,
        this.audioPlayerFactory,
        this.renderer
    );
    pointerControl.onTouch(pointerEvent);
  }



  /**
   * On resize
   * @param event
   */
  onResize(event) {
    this.throttledResize();
  }

  /**
   * Resize diagram
   */
  private resizeHandler() {
    this.diagram.setDimension(this.getDimension());
    this.voronoiRenderer.resize(this.getDimension());
  }

  /**
   * Return DOM element dimension
   * @returns {Dimension}
   */
  private getDimension():Dimension {
    return new Dimension(
        this.elementRef.nativeElement.offsetWidth,
        this.elementRef.nativeElement.offsetHeight
    );
  }


  /**
   * Create voronoi diagram
   */
  private createDiagram() {
    this.diagram = new VoronoiDiagram(this.getDimension());
    new VoronoiBoard(this.diagram, this.board);
    this.diagram.initialize();
  }
}
