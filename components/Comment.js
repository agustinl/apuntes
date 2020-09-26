import { css } from '@emotion/core'

const Comment = ({ commentData, authorId }) => {

    const { userName, comment, userId } = commentData;

    const isAuthor = authorId => {
        if(userId == authorId) {
            return true;
        }
    }

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
                        src={`https://api.adorable.io/avatars/45/${userName}.png`}
                        className="s-circle"
                        alt={userName}
                    />
                </div>
            </div>
            <div className="tile-content">
                <p className="tile-title text-bold" css={css`
                    margin:10px 0;
                `}>{userName}</p>
                <p className="tile-subtitle text-small" css={css`
                    margin:10px 0;
                `}>
                    {comment}
                </p>
                <p className="tile-subtitle text-small text-right" css={css`
                    margin:0;
                `}>
                </p>
            </div>
            <div className="tile-action">
                { isAuthor( userId ) && <span class="label label-secondary text-small">
                    Autor <i className="icon icon-check"></i>
                </span> }
            </div>
        </div>
    );
};

export default Comment;
