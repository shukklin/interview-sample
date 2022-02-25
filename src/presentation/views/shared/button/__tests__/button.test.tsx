import React from 'react';
import { Button } from '../Button';
import { render } from '@testing-library/react';

describe('button', function () {
	it('renders correctly', () => {
		const tree = render(<Button>Simple Button</Button>);

		expect(tree).toMatchSnapshot();
	});
});
