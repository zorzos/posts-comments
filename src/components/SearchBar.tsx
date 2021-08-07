import { Input } from 'antd'
const { Search } = Input

function SearchBar(props: {setUsernameFilter: (username: string) => void}) {
    return (
        <div>
            <Search
                className={"search-bar"}
                placeholder="Filter posts by username" 
                onSearch={value => props.setUsernameFilter(value)} 
                enterButton 
                size="large" 
            />
        </div>
    )
}

export default SearchBar
