import Link from 'next/link'
import { css, jsx } from '@emotion/core'

const Apunte = () => {
    return (
        <div className="card" css={css`
            margin-bottom:20px;
        `}>
            <div className="card-image">
                {/* <img src="img/osx-el-capitan.jpg" className="img-responsive"> */}
            </div>
            <div className="card-header">
                <div className="card-title h5">
                    <Link href="/apunte/[id]" as={`/apunte/1`}>
                        <a>Titulo de apunte</a>
                    </Link>
                </div>
                <div className="card-subtitle text-gray">
                    Hardware and software
                </div>
            </div>
            <div className="card-footer">
                <span className="chip mb-1">50 Puntos</span>
                <p className="text-italic text-tiny float-right mb-1">
                    <i className="mb-1 icon icon-time"></i> Publicado hace: 20
                    minutos
                </p>
            </div>
        </div>
    );
};

export default Apunte;
