import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';


import FotoItem from './Foto';
import TimelineAPI from '../rules/TimelineAPI';


class Timeline extends Component {

    constructor(props) {
        super(props);
        this.login = this.props.login;
    }

    componentDidMount() {
        this.props.carregaFotos(this.login);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== this.login) {
            this.login = nextProps.login;
            this.props.carregaFotos(this.login);
        }
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.props.fotos.map(foto =>
                            <FotoItem
                                key={foto.id}
                                foto={foto}
                                likear={this.props.likear}
                                comentar={this.props.comentar}
                            />)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { fotos: state.timelineReduces }
};

const mapDispatchToProps = dispatch => {
    return {
        likear: (fotoId) => {
            dispatch(TimelineAPI.likear(fotoId));
        },
        comentar: (fotoId, comentario) => {
            dispatch(TimelineAPI.comentar(fotoId, comentario))
        },
        carregaFotos: (login) => {
            dispatch(TimelineAPI.carregaFotos(login));
        }

    }
}

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;