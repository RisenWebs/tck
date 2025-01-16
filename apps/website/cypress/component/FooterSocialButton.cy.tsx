import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import FooterSocialButton from '../../src/components/footer/FooterSocialButton/FooterSocialButton';

beforeEach(() => {
  cy.mount(<FooterSocialButton icon={faGoogle} href='https://example.com/' />);
});

describe('<FooterSocialButton />', () => {
  it('mounts', () => {
    // Should mount.
  });
  it('href is passed for a new tab', () => {
    cy.get('a').should('have.attr', 'target', '_blank');
    cy.get('a').should('have.attr', 'href', 'https://example.com/');
  });
});
