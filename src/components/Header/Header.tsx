import React, {Fragment} from 'react';
import Media from 'react-media';
import {DesktopMenu} from './DesktopMenu/DesktopMenu';
import {MobileMenuButton} from './MobileMenu/MobileMenuButton';

export function Header(): JSX.Element {
    return (
        <div>
            <Media queries={{
                small: '(max-width: 1199px)',
                large: '(min-width: 1200px)'
            }}>
                {matches => (
                    <Fragment>
                        {matches.small && <p><MobileMenuButton/></p>}
                        {matches.large && <p><DesktopMenu/></p>}
                    </Fragment>
                )}
            </Media>
        </div>
    );
}




