import * as React from 'react';
import 'css/footer.css';
import AnchorLink, { AnchorLinkProps } from './AnchorLink';

export interface FooterProps {}

// tslint:disable-next-line
const About: AnchorLinkProps[] = [
  {
    title: 'About Put Your Hands Up',
    href: '/',
    className: '',
    iconClassName: 'fas fa-home',
    isExternal: false
  },
  {
    title: 'About Me',
    href: 'https://nkgrnkgr.github.io/',
    className: '',
    iconClassName: 'fa fa-user',
    isExternal: true
  }
];

// tslint:disable-next-line
const Links: AnchorLinkProps[] = [
  {
    title: 'Github',
    href: 'https://github.com/nkgrnkgr/put-your-hands-up/',
    className: '',
    iconClassName: 'fab fa-github',
    isExternal: true
  },
  {
    title: 'Terms',
    href: '/termes',
    className: '',
    iconClassName: 'far fa-file-alt',
    isExternal: false
  },
  {
    title: 'Privacy',
    href: '/privacy',
    className: '',
    iconClassName: 'far fa-address-card',
    isExternal: false
  }
];

// tslint:disable-next-line
const Contact: AnchorLinkProps[] = [
  {
    title: 'Email',
    href: 'mailto:nkgrnkgr.put.your.hands.up@gmail.com',
    className: '',
    iconClassName: 'far fa-envelope',
    isExternal: true
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/pyhu10',
    className: '',
    iconClassName: 'fab fa-twitter',
    isExternal: true
  }
];

const anchorLinks = {
  About,
  Links,
  Contact
};

const footer: React.SFC<FooterProps> = () => {
  return (
    <footer className="footer ">
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column">logo</div>
            {Object.keys(anchorLinks).map((key, index) => {
              const a: AnchorLinkProps[] = anchorLinks[key];
              return (
                <div className="column" key={key}>
                  <h5 className="title">{key}</h5>
                  <ul>
                    {a.map((link, index) => {
                      const {
                        title,
                        href,
                        className,
                        iconClassName,
                        isExternal
                      } = link;
                      return (
                        <li key={index}>
                          <AnchorLink
                            title={title}
                            href={href}
                            className={className}
                            iconClassName={iconClassName}
                            isExternal={isExternal}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default footer;
