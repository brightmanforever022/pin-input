import { render, screen } from '@testing-library/react';
import PinInput from './PinInput';

describe('Pin Input', () => {
   beforeEach(() => {
    render(<PinInput numberOfPins={6} />);
  })

  it('The inputs should be equal to the length specified', () => {
    expect(document.querySelectorAll('input:not([type="checkbox"])')).toHaveLength(6);
  });
  
  it('The inputs should be styled via width and height', () => {
    const pin: HTMLInputElement = document.querySelector('input[type="text"]');
    expect(pin.style.height).toEqual('50px')
  })
})

