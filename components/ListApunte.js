import Link from 'next/link'
import { css } from '@emotion/core'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'

const ListApunte = ({ apunte }) => {

    const { id, date, fileName, signature, votes } = apunte;

    return (
        <div className="card" css={css`
            margin-bottom:20px;
        `}>
            <div className="card-image">
                {/* <img src="img/osx-el-capitan.jpg" className="img-responsive"> */}
            </div>
            <div className="card-header">
                <div className="card-title h5">
                    <Link href="/apunte/[id]" as={`/apunte/${id}`}>
                        <a>{fileName}</a>
                    </Link>
                </div>
                <div className="card-subtitle text-gray">
                    {signature}
                </div>
            </div>
            <div className="card-footer">
                <span className="chip mb-1">{votes === 1 ? votes + " Punto" : votes + " Puntos"}</span>
                <p className="text-italic text-tiny float-right mb-1">
                    <i className="mb-1 icon icon-time"></i> Publicado hace { formatDistanceToNow( new Date(date), {locale: es} )}
                </p>
            </div>
        </div>
    );
};

export default ListApunte;
