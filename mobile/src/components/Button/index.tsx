import React, {ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {styles} from './styles';
import {Text} from 'react-native-gesture-handler';

interface ButtonRootProps extends TouchableOpacityProps {
  children: React.ReactElement<ButtonLabelProps> | React.ReactElement<ButtonLabelProps>[];
  type?: 'default' | 'outiline' | 'ghost' | 'desctructive';
  style?: any;
}

function ButtonRoot({
    type = 'default',
    children,
    style,
    ...props
}: ButtonRootProps) {
    const typeStyles = {
      default: styles.default,
      outiline: styles.outiline,
      ghost: styles.ghost,
      desctructive:styles.desctructive,
    };
  return (
    <TouchableOpacity
      {...props}
      style={[typeStyles[type], style, props.disabled && styles.disabled]}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {type});
        }
        return child;
      })}
    </TouchableOpacity>
  );
}

interface ButtonLabelProps {
  children: ReactNode;
  style?: any;
  type?: 'default' | 'outiline' | 'ghost' | 'desctructive';
}

function ButtonLabel({children, type = 'default', style}: ButtonLabelProps) {
    const typeStylesLabel = {
        default: styles.defaultLabel,
        outiline: styles.outilineLabel,
        ghost: styles.ghostLabel,
        desctructive:styles.desctructiveLabel,
      };

  return <Text style={[styles.label, typeStylesLabel[type], style]}>{children}</Text>;
}
export const Button = {
  Root: ButtonRoot,
  Label: ButtonLabel,
};
