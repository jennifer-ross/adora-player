import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Icon from "./Icon";

class Menu extends Component {
    render() {
        return (
            <div className='menu'>
                <div>
                    <div className="menu-items-container">
                        <Link to={'/'}>
                            <span className='menu__item active'><Icon iconName={'fal fa-bullseye'}/>Главное</span>
                        </Link>
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-waveform'}/>Подкасты</span>
                        </Link>
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-signal-stream'}/>Радио</span>
                        </Link>
                    </div>
                    <div className="menu-items-title">Умные плейлисты</div>
                    <div className="menu-items-container">
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-compact-disc'}/>Плейлист дня</span>
                        </Link>
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-stream'}/>Премьеры</span>
                        </Link>
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-icons'}/>Дежавю</span>
                        </Link>
                    </div>
                    <div className="menu-items-title">Мои плейлисты</div>
                    <div className="menu-items-container">
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-list-music'}/>Любимые треки</span>
                        </Link>
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-list-music'}/>Чилл</span>
                        </Link>
                        <Link to={'/'}>
                            <span className='menu__item'><Icon iconName={'fal fa-list-music'}/>Дип</span>
                        </Link>
                    </div>
                </div>
                <div className="menu__actions">
                    <button className="button btn-accent btn-create-playlist">
                        Создать плейлист <Icon iconName={'fal fa-layer-plus'}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default Menu;