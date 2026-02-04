"use client";

import React from "react";
import { Typography as OriginTypography } from "antd";
import type { ParagraphProps } from "antd/es/typography/Paragraph";
import type { TitleProps } from "antd/es/typography/Title";

const Title = React.forwardRef<
  HTMLElement,
  TitleProps & React.RefAttributes<HTMLElement>
>((props, ref) => <OriginTypography.Title ref={ref} {...props} />);

const Paragraph = React.forwardRef<
  HTMLElement,
  ParagraphProps & React.RefAttributes<HTMLElement>
>((props, ref) => <OriginTypography.Paragraph ref={ref} {...props} />);

Title.displayName = "Title";
Paragraph.displayName = "Paragraph";

export { Title, Paragraph };
