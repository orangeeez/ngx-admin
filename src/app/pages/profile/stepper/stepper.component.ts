import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  getDeepFromObject,
  NbAuthResult,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";
import {
  NbGlobalPhysicalPosition,
  NbStepperComponent,
  NbToastrService,
} from "@nebular/theme";
import { TELEGRAM_BOT_OPTIONS } from "../../../auth/auth.options";
import { AuthService } from "../../../auth/services/auth.service";
import { User } from "../../../models/user";

@Component({
  selector: "ngx-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent implements OnInit {
  @ViewChild("stepper") stepper: NbStepperComponent;
  @Input() user: User;
  @Output() close = new EventEmitter<void>();

  isLoad: boolean = false;
  isLoadError: boolean = false;
  strategy: string = "";

  emailForm = new FormGroup({
    email: new FormControl("", Validators.required),
  });

  telegramForm = new FormGroup({
    tg: new FormControl(""),
  });

  completedForm = new FormGroup({});

  constructor(
    @Inject(TELEGRAM_BOT_OPTIONS) public botOptions,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    public authService: AuthService,
    public toastrService: NbToastrService
  ) {
    this.strategy = this.getConfigValue("forms.login.strategy");
  }

  get email() {
    return this.emailForm.get("email");
  }

  ngOnInit() {}

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onEmailSubmit() {
    this.emailForm.markAsDirty();
    this.authService
      .emailLink(this.strategy, { email: this.email.value })
      .subscribe((result: NbAuthResult) => {
        this.user = result.getToken().getPayload();
        this.stepper.next();
        this.onStepperComplete();

        this.toastrService.show(
          `@${this.user.email} was successfully linked.`,
          `Email linking`,
          {
            position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
            status: "success",
            duration: 5000,
          }
        );
      });
  }

  onTgLogin(data: any) {
    this.telegramForm.markAsDirty();
    this.authService
      .tgLogin(this.strategy, "/link", data)
      .subscribe((result: NbAuthResult) => {
        this.user = result.getToken().getPayload();
        this.stepper.next();
        this.onStepperComplete();

        this.toastrService.show(
          `@${this.user.tg_username} was successfully linked.`,
          `Telegram linking`,
          {
            position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
            status: "success",
            duration: 5000,
          }
        );
      });
  }

  onCloseClick() {
    this.close.emit();
  }

  onStepperComplete() {
    var nextStep = this.stepper.steps.toArray()[this.stepper.selectedIndex + 1];
    if (nextStep.label === "Completed")
      setTimeout(() => {
        this.close.emit();
      }, 5000);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
