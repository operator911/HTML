import type { FrameState, Shot } from './types';
import { dolly } from './ease';

/**
 * The Director chains cinematic "shots" for the current world and applies
 * eased progress to it. It only drives the camera while `active` — user
 * interaction pauses it; the app resumes it after an idle period.
 */
export class Director {
  active = true;
  private shots: Shot[] = [];
  private index = 0;
  private t = 0;
  onShotChange?: (shot: Shot, index: number) => void;

  setShots(shots: Shot[]): void {
    this.shots = shots;
    this.index = 0;
    this.t = 0;
    if (shots.length) {
      shots[0].begin?.();
      this.onShotChange?.(shots[0], 0);
    }
  }

  get currentShotName(): string | null {
    return this.shots[this.index]?.name ?? null;
  }

  /** advance to the next shot immediately (used by "next scene" button) */
  next(): void {
    if (!this.shots.length) return;
    this.index = (this.index + 1) % this.shots.length;
    this.t = 0;
    this.shots[this.index].begin?.();
    this.onShotChange?.(this.shots[this.index], this.index);
  }

  update(dt: number, f: FrameState): void {
    if (!this.active || !this.shots.length || !f.playing) return;
    this.t += dt;
    const shot = this.shots[this.index];
    let p = this.t / shot.duration;
    while (p >= 1) {
      p -= 1;
      this.t -= shot.duration;
      this.index = (this.index + 1) % this.shots.length;
      this.shots[this.index].begin?.();
      this.onShotChange?.(this.shots[this.index], this.index);
    }
    this.shots[this.index].apply(dolly(p), f);
  }
}
