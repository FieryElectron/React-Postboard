import Button from '../Button/Button';
import './TimeSelector.css'

const TimeSelector = () => {

    const clickTest = () => {
        console.log('clickTest');
    }

    return (
        <div data-testid='timeSelectorContainer' className='timeSelectorContainer'>
            <h3 data-testid='timeSelectorTitle1'  className='timeSelectorTitle'>From</h3>
            <input data-testid='timeSelectorDate1' type='date' className='timeSelectorDate'></input>
            <h3 data-testid='timeSelectorTitle2' className='timeSelectorTitle'>To</h3>
            <input data-testid='timeSelectorDate2' type='date' className='timeSelectorDate'></input>
            <Button text='Refresh Posts' onClick={clickTest} />
        </div>
    )
}

export default TimeSelector;