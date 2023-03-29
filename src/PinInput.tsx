import React from 'react';

type InputItem = {
    value: number | string
    id: number
}

type Props = {
    numberOfPins: number
    defaultValue?: string
}


const PinInput = ({numberOfPins, defaultValue}: Props) => {
    
    const [secret, setSecret] = React.useState<boolean>(false);
    const [activeNumber, setActiveNumber] = React.useState(0);
    const [items, setItems] = React.useState<InputItem[]>([]);
    const autoFocus = React.useCallback((el: any) => (el ? el.focus() : null), []);

    React.useEffect(() => {
        const _items = Array(numberOfPins).fill(0).map((_, i):InputItem => ({
            value: defaultValue ? defaultValue.split('')[i] : '',
            id: i
        }))
        setItems(_items)
    }, [defaultValue, numberOfPins]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as unknown as number;
        if(value && !isNaN(value)) {
            items[activeNumber].value = value;
            setItems(items.slice());
            setActiveNumber(activeNumber + 1);
            if(activeNumber + 1 === numberOfPins) {
                postProcessing(items)
            }
        }
    }

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value || value === '') {
            setActiveNumber(+e.target.id);
            (document.getElementById(e.target.id) as HTMLInputElement).select();
        }
    }

    const onSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecret(e.target.checked);
        setItems(items.slice());
    }
    
    const postProcessing = (_items: InputItem[]) => {
        const pin = _items.map(item => item.value).join('');
        if(pin.length < numberOfPins) {
            console.log('There are some empty pins: ', pin);    
        } else {
            console.log('last pin has been inputed: ', pin);
        }
    }

    const onPaste = (e: React.ClipboardEvent) => {
        const d = e.clipboardData.getData('text');
        const pastedPins = d.split('');
        const _items = Array(numberOfPins).fill(0).map((_, i):InputItem => ({
            value: !isNaN(pastedPins[i] as unknown as number) ? pastedPins[i] : '',
            id: i
        }))
        setItems(_items);
        // setActiveNumber(d.length - 1);
        if(d.length >= numberOfPins) {
            postProcessing(_items);
        }
    }

    return (
        <div>
            <div style={{marginBottom: '10px'}}>
                <input 
                    type={'checkbox'} 
                    id='secret'
                    value='secret'
                    onChange={onSecretChange}
                />
                <label htmlFor='secret'>Secret</label>
            </div>
            {items.map((item, i) => (
                <input 
                    key={i}
                    style={{marginRight: '10px', height: '50px', width: '50px'}}
                    id={i.toString()}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    ref={i === activeNumber ? autoFocus : undefined}
                    value={item.value ? item.value : ''}
                    type={secret ? 'password' : 'text'}
                    maxLength={1}
                    pattern={'[0-9]*'}
                    onPaste={onPaste}
                />
            ))}
        </div>
    )
}

export default PinInput;