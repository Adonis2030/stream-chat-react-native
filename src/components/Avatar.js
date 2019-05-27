import React from 'react';
import PropTypes from 'prop-types';

import styled from '@stream-io/styled-components';

const AvatarContainer = styled.View`
  display: flex;
  align-items: center;
`;

const AvatarImage = styled.Image`
  border-radius: ${({ theme, size }) =>
    theme.avatarImage.borderRadius || size / 2};
  width: ${({ theme, size }) => theme.avatarImage.width || size};
  height: ${({ theme, size }) => theme.avatarImage.height || size};
`;

const AvatarFallback = styled.View`
  border-radius: ${({ theme, size }) =>
    theme.avatarImage.borderRadius || size / 2};
  width: ${({ theme, size }) => theme.avatarImage.width || size};
  height: ${({ theme, size }) => theme.avatarImage.height || size};
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: ${({ theme }) => theme.avatarFallback.justifyContent};
  align-items: ${({ theme }) => theme.avatarFallback.alignItems};
`;

const AvatarText = styled.Text`
  color: ${({ theme }) => theme.avatarText.color};
  text-transform: ${({ theme }) => theme.avatarText.textTransform};
  font-size: ${({ theme }) => theme.avatarText.fontSize};
  font-weight: ${({ theme }) => theme.avatarText.fontWeight};
`;

/**
 * Avatar - A round avatar image with fallback to user's initials
 *
 * @example ./docs/Avatar.md
 * @extends PureComponent
 */
export class Avatar extends React.PureComponent {
  static propTypes = {
    /** image url */
    image: PropTypes.string,
    /** name of the picture, used for title tag fallback */
    name: PropTypes.string,
    /** shape of the avatar, circle, rounded or square */
    shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
    /** size in pixels */
    size: PropTypes.number,
    /** Style overrides */
    style: PropTypes.object,
  };

  static defaultProps = {
    shape: 'circle',
    size: 32,
  };

  state = {
    imageError: false,
  };

  setError = () => {
    this.setState({
      imageError: true,
    });
  };

  getInitials = (name) =>
    name
      ? name
          .split(' ')
          .slice(0, 2)
          .map((name) => name.charAt(0))
      : null;

  render() {
    const { size, name, image } = this.props;
    const initials = this.getInitials(name);
    return (
      <AvatarContainer>
        {image && !this.state.imageError ? (
          <AvatarImage
            size={size}
            source={{ uri: image }}
            accessibilityLabel="initials"
            resizeMethod="resize"
            onError={this.setError}
          />
        ) : (
          <AvatarFallback size={size}>
            <AvatarText>{initials}</AvatarText>
          </AvatarFallback>
        )}
      </AvatarContainer>
    );
  }
}
