import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  readonly label: string;
  readonly path: string;
  readonly exact: boolean;
}

const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: 'Inicio', path: '/', exact: true },
  { label: 'Menú', path: '/menu', exact: false },
  { label: 'Promociones', path: '/promociones', exact: false },
  { label: 'Nosotros', path: '/nosotros', exact: false },
  { label: 'Ubicación', path: '/ubicacion', exact: false },
];

@Component({
  selector: 'pm-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly isMenuOpen = signal(false);
  protected readonly navigationItems = NAVIGATION_ITEMS;

  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly firstMobileLink = viewChild<ElementRef<HTMLAnchorElement>>('firstMobileLink');

  constructor() {
    effect(() => {
      if (this.isMenuOpen()) {
        const firstLink = this.firstMobileLink();
        if (firstLink) {
          queueMicrotask(() => firstLink.nativeElement.focus());
        }
      }
    });
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(restoreFocus = false): void {
    this.isMenuOpen.set(false);

    if (restoreFocus) {
      queueMicrotask(() => this.menuButton().nativeElement.focus());
    }
  }

  @HostListener('document:keydown.escape')
  protected closeMenuWithKeyboard(): void {
    if (this.isMenuOpen()) {
      this.closeMenu(true);
    }
  }
}
