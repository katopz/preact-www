import { h, Component } from 'preact';
import cx from 'classnames';
import { bind } from 'decko';
import ContentRegion from '../../content-region';
import style from './style';

const EMPTY = {};

const getContent = route => route.content || route.path;

export default class Page extends Component {
	state = { loading:true };

	componentWillReceiveProps({ route }) {
		if (getContent(route)!==getContent(this.props.route)) {
			this.setState({ loading:true });
		}
	}

	@bind
	onLoad({ meta }) {
		this.setState({
			current: getContent(this.props.route),
			meta,
			loading: false
		});
	}

	render({ route }, { current, loading, meta=EMPTY, toc }) {
		let layout = `${meta.layout || 'default'}Layout`,
			name = getContent(route);
		if (name!==current) loading = true;
		return (
			<div class={cx(style.page, style[layout])} loading={loading}>
				{ meta.show_title!==false && (
					<h1 key="title" class={style.title}>{ meta.title || route.title }</h1>
				) }
				{ toc && meta.toc!==false && (
					<Toc key="toc" items={toc} />
				) }
				<div key="loading" class={style.loading}>
					<progress-spinner />
				</div>
				<div key="content" class={style.inner}>
					<ContentRegion
						name={name}
						onToc={this.linkState('toc', 'toc')}
						onLoad={this.onLoad}
					/>
				</div>
			</div>
		);
	}
}


class Toc extends Component {
	toggle = e => {
		this.setState({ open: !this.state.open });
		return false;
	};

	open = () => this.setState({open:true});

	render({ items }, { open }) {
		return (
			<div class={style.toc} open={open}>
				<a class={style.toggle} onClick={this.toggle} title="Table of Contents">🔗</a>
				<nav tabIndex="2" onFocus={this.open}>
					{ items.map( ({ text, level, id }) => (
						<a href={'#' + id}>{ text }</a>
					)) }
				</nav>
			</div>
		);
	}
}
