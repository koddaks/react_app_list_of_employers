import './app-info.css'

const AppInfo = (props) => {
    const {increased, emlpoyers} = props;
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании</h1>
            <h2>Общее число сотрудников {emlpoyers}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    )
}

export default AppInfo;