"use client";

import * as React from "react";

// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Icons } from "@/components/ui/icons";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { H1, Paragraph } from "@/components/ui/typography";
import { navigations } from "@/lib/navigations";
import { cn } from "@/lib/utils";
import { IUser } from "@/models/user";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.currentTarget;
    const body: IUser = {
      email: form.email.value?.trim(),
      address: form.address.value?.replace(/-/g, "")?.trim(),
      phone: form.phoneNumber.value?.replace(/-/g, "")?.trim(),
      firstName: form.firstName.value?.trim(),
      lastName: form.lastName.value?.trim(),
      twitter: form.twitter.value?.trim(),
    };

    if (!form.terms.value) {
      setIsLoading(false);
      return alert("You must agree to the terms of service to continue");
    }

    fetch("/api/sign_up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((e) => {
        if (e.status !== 200) {
          throw new Error();
        }

        alert("受付を完了しました。メールを確認下さい");
        setIsFinished(true);
      })
      .catch(() => {
        alert("登録に失敗しました。再度やり直して下さい");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {isFinished ? (
        <Link href={navigations.index} variant={"outline"} size={"button"}>
          ホームへ戻る
        </Link>
      ) : (
        <Card className={"py-4 bg-background backdrop-blur-sm"} style={{ background: "hsla(0,0%,100%,.7)" }}>
          <CardContent className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <H1 className="pb-0 text-2xl sm:text-2xl md:text-2xl font-semibold tracking-tight">Apply for an event</H1>
              <Paragraph className="text-sm text-muted-foreground">Please enter the required information</Paragraph>
            </div>
            {/* <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-2 grid-cols-2">
                  <div>
                    <Label className="sr-only" htmlFor="lastName">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      required={true}
                      placeholder="last name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="family-name"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label className="sr-only" htmlFor="firstName">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      required={true}
                      placeholder="first name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="given-name"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <Label className="sr-only" htmlFor="phoneNumber">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    required={true}
                    placeholder="phone number"
                    type="tel"
                    autoCapitalize="none"
                    autoComplete="tel"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    required={true}
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    symbol address
                  </Label>
                  <Input
                    id="address"
                    required={true}
                    placeholder="symbol address"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    pattern="N[A-Z0-9]{38}"
                    onInput={(e) => {
                      if (e.currentTarget.validity.patternMismatch) {
                        e.currentTarget.setCustomValidity("Please enter 39-digit symbol address without hyphens.");
                      } else {
                        e.currentTarget.setCustomValidity("");
                      }
                    }}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    twitter account id
                  </Label>
                  <Input
                    id="twitter"
                    required={true}
                    placeholder="@twitter-id"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    pattern="^@.*"
                    onInput={(e) => {
                      if (e.currentTarget.validity.patternMismatch) {
                        e.currentTarget.setCustomValidity("Please enter twitter account id.");
                      } else {
                        e.currentTarget.setCustomValidity("");
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-center space-x-2 py-3">
                  <Checkbox id="terms" required={true} disabled={isLoading} />
                  <Label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="terms"
                  >
                    Accept terms and conditions
                  </Label>
                </div>
                <Button disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In with Email
                </Button>
                <Paragraph className="text-center text-sm text-muted-foreground pt-2">
                  by clicking continue, you agree to our{" "}
                  <Link href="/terms#terms" className="underline text-sm underline-offset-4 hover:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms#privacy" className="underline text-sm underline-offset-4 hover:text-primary">
                    Privacy Policy
                  </Link>
                </Paragraph>
              </div>
            </form> */}

            <div className="h-72 flex flex-col justify-center items-center space-y-4">
              <Paragraph className="text-center">
                Xymposium 2023 への
                <br />
                参加申し込みは終了しました
              </Paragraph>
              <Link href={navigations.index} variant={"button"} size={"button"}>
                ホームへ戻る
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
