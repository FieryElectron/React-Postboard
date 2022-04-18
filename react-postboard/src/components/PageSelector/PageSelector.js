import './PageSelector.css'

const PageSelector = () => {
    return (
        <div data-testid='pageSelectorContainer' className='pageSelectorContainer'>
            <span data-testid='pageSelectorTitle' className='pageSelectorTitle'>Page</span>
            <select data-testid='pageSelectorSelect' className='pageSelectorSelect'>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>


    )
}

export default PageSelector;