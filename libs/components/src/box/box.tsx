import { ReactNode } from 'react';
import styles from './box.module.css';
import type { Property } from 'csstype';

type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Props = {
  children: ReactNode;
  display?: Property.Display;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  gap?: Space;
  direction?: Property.FlexDirection;
  flexBasis?: Property.FlexBasis;
  flexWrap?: Property.FlexWrap;
  flexGrow?: Property.FlexGrow;
  flexShrink?: Property.FlexShrink;
  mb?: Space;
  minHeight?: Property.MinHeight;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: Property.Top;
  right?: Property.Right;
  bottom?: Property.Bottom;
  left?: Property.Left;
  backgroundColor?: 'primary' | 'danger' | 'tertiary';
  color?: 'white' | 'primary' | 'danger' | 'tertiary';
  padding?: Space;
  borderRadius?: 'default';
  fontSize?: 'small' | 'medium' | 'large';
  opacity?: 'low' | 'medium' | 'high';
  transition?: 'opacity' | 'all';
};

export default function Box({
  children,
  display,
  alignItems,
  justifyContent,
  gap,
  direction,
  flexBasis,
  flexWrap,
  flexGrow,
  flexShrink,
  mb,
  minHeight,
  position,
  top,
  right,
  bottom,
  left,
  backgroundColor,
  color,
  padding,
  borderRadius,
  fontSize,
  opacity,
  transition,
}: Props) {
  return (
    <div
      data-display={display}
      data-align-items={alignItems}
      data-justify-content={justifyContent}
      data-gap={gap}
      data-direction={direction}
      data-flex-wrap={flexWrap}
      data-mb={mb}
      data-padding={padding}
      data-background-color={backgroundColor}
      data-color={color}
      data-border-radius={borderRadius}
      data-font-size={fontSize}
      data-opacity={opacity}
      data-transition={transition}
      data-position={position}
      className={styles.box}
      style={{
        // @ts-expect-error: custom property
        '--box-flex-basis': flexBasis,
        '--box-flex-grow': flexGrow,
        '--box-flex-shrink': flexShrink,
        minHeight,
        top,
        right,
        bottom,
        left,
      }}
    >
      {children}
    </div>
  );
}
