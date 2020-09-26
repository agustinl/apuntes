import { css, jsx } from '@emotion/core';

const Comment = () => {
    return (
        <div className="tile" css={css`
            margin-bottom: 20px;
            border: .05rem solid #dadee4;
            border-radius: .1rem;
            padding: 10px;
        `}>
            <div className="tile-icon">
                <div className="example-tile-icon">
                    <img
                        src="https://api.adorable.io/avatars/50/abott@adorable.png"
                        className="s-circle"
                    />
                </div>
            </div>
            <div className="tile-content">
                <p className="tile-title text-bold" css={css`
                    margin:10px 0;
                `}>Username</p>
                <p className="tile-subtitle text-small" css={css`
                    margin:10px 0;
                `}>
                    Earth's Mightiest Heroes joined forces to take on threats
                    that were too big for any one hero to tackle...
                </p>
                <p className="tile-subtitle text-small text-right" css={css`
                    margin:0;
                `}>
                    12/12/2020
                </p>
            </div>
            <div className="tile-action">
                <span class="label label-secondary text-small">
                    Autora <i className="icon icon-check"></i>
                </span>
            </div>
        </div>
    );
};

export default Comment;
