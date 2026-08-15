import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

type AuthMode = 'login' | 'register' | 'recovery';

interface AuthFormControls {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  remember: FormControl<boolean>;
  acceptTerms: FormControl<boolean>;
}

const passwordsMatch = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmPassword')?.value;
  return password === confirmation ? null : { passwordsMismatch: true };
};

@Component({
  selector: 'pm-auth',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auth {
  private readonly routeData = inject(ActivatedRoute).snapshot.data;

  protected readonly mode = this.routeData['authMode'] as AuthMode;
  protected readonly passwordVisible = signal(false);
  protected readonly confirmationVisible = signal(false);
  protected readonly submittedMessage = signal<string | null>(null);
  protected readonly form = this.createForm();

  protected get title(): string {
    switch (this.mode) {
      case 'register':
        return 'Crea tu cuenta';
      case 'recovery':
        return 'Recupera tu acceso';
      default:
        return 'Bienvenido a bordo';
    }
  }

  protected get introduction(): string {
    switch (this.mode) {
      case 'register':
        return 'Completa tus datos para preparar tu cuenta de cliente.';
      case 'recovery':
        return 'Indica tu correo y te enviaremos instrucciones cuando el servicio esté habilitado.';
      default:
        return 'Ingresa tus datos para continuar con tu misión.';
    }
  }

  protected hasError(controlName: keyof AuthFormControls, error: string): boolean {
    const control = this.form.controls[controlName];
    return control.hasError(error) && (control.touched || control.dirty);
  }

  protected togglePassword(): void {
    this.passwordVisible.update((visible) => !visible);
  }

  protected toggleConfirmation(): void {
    this.confirmationVisible.update((visible) => !visible);
  }

  protected submit(): void {
    this.submittedMessage.set(null);
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const messages: Record<AuthMode, string> = {
      login: 'El formulario está listo. El inicio de sesión se habilitará al conectar el backend.',
      register:
        'El formulario está listo. La creación de cuentas se habilitará al conectar el backend.',
      recovery:
        'El formulario está listo. La recuperación de acceso se habilitará al conectar el backend.',
    };

    this.submittedMessage.set(messages[this.mode]);
  }

  private createForm(): FormGroup<AuthFormControls> {
    const isRegister = this.mode === 'register';
    const requiresPassword = this.mode !== 'recovery';

    return new FormGroup<AuthFormControls>(
      {
        name: new FormControl('', {
          nonNullable: true,
          validators: isRegister ? [Validators.required, Validators.minLength(2)] : [],
        }),
        email: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        phone: new FormControl('', {
          nonNullable: true,
          validators: isRegister
            ? [Validators.required, Validators.pattern(/^[0-9+\s-]{7,16}$/)]
            : [],
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: requiresPassword ? [Validators.required, Validators.minLength(8)] : [],
        }),
        confirmPassword: new FormControl('', {
          nonNullable: true,
          validators: isRegister ? [Validators.required] : [],
        }),
        remember: new FormControl(false, { nonNullable: true }),
        acceptTerms: new FormControl(false, {
          nonNullable: true,
          validators: isRegister ? [Validators.requiredTrue] : [],
        }),
      },
      { validators: isRegister ? passwordsMatch : [] },
    );
  }
}
