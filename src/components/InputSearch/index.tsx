
import { Box } from '@chakra-ui/react';
import classNames from 'classnames';
import { EventType } from 'models/commonModel';
import styles from './Input.module.css';

type InputSearchProps = {
    icon?: any
    value?: string
    onChange?: (e: EventType) => void;
    onClickSearch?: () => void;
};

const InputSearch: React.FC<InputSearchProps> = ({
    icon,
    value,
    onChange,
    onClickSearch,
}) => {

    const handleKeyDown = (e: any) => {
        e.keyCode === 13 && onClickSearch
    }

    return (
        <Box className={`${styles['input-wrapper']} w-full relative`}>
            <input
                value={value}
                className={classNames(styles.input, 'py-3 px-4 w-full')}
                placeholder="Search the store"
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <Box
                onClick={onClickSearch}
                transform={'translateY(-50%)'}
                className="absolute top-1/2 right-5 font-bold cursor-pointer">
                {icon}
            </Box>
        </Box>
    );
};

export default InputSearch;