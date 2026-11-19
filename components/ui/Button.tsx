import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "ink" | "acc" | "line";

type CommonProps = {
  variant?: Variant;
  size?: "sm";
  /** Show the sliding → arrow. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & { href: ComponentProps<typeof Link>["href"] } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;
type AsAnchor = CommonProps & { href: string; external: true } & Omit<
    ComponentProps<"a">,
    "href" | "className" | "children"
  >;
type AsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = AsLink | AsAnchor | AsButton;

export function buttonClass({ variant = "ink", size, className }: Pick<CommonProps, "variant" | "size" | "className">) {
  return ["btn", `btn-${variant}`, size === "sm" && "btn-sm", className].filter(Boolean).join(" ");
}

export function Arrow() {
  return (
    <span className="ar" aria-hidden="true">
      →
    </span>
  );
}

export function Button(props: ButtonProps) {
  const { variant, size, arrow, className, children, ...rest } = props;
  const cls = buttonClass({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if ("external" in rest && rest.external) {
    const { external: _external, ...anchorProps } = rest;
    void _external;
    return (
      <a className={cls} {...anchorProps}>
        {content}
      </a>
    );
  }
  if (rest.href !== undefined) {
    return (
      <Link className={cls} {...(rest as Omit<AsLink, keyof CommonProps>)}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as Omit<AsButton, keyof CommonProps>)}>
      {content}
    </button>
  );
}
