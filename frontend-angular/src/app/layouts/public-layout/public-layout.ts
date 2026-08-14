import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pm-public-layout',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-dvh bg-pm-background text-pm-foreground">
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
