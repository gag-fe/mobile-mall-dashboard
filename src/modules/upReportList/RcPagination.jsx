import React from 'react';
import classNames from 'classnames';
import { Button, Flex} from 'antd-mobile';
class Pagination extends React.Component {
  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: props.current,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.current,
    });
  }

  onChange(p) {
    if(!p){
      return false;
    }
    this.setState({
      current: p,
    });
    if (this.props.onChange) {
      this.props.onChange(p);
    }
  }

  render() {
    const { prefixCls, className, style, mode, total, simple, nextText, prevText } = this.props;
    const current = this.state.current;
    let markup = (
      <Flex>
        <Flex.Item className={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-prev`}>
          <Button inline disabled={current <= 0} onClick={() => this.onChange(current - 1)}>{prevText}</Button>
        </Flex.Item>
        {this.props.children ? (<Flex.Item>{this.props.children}</Flex.Item>) : (!simple &&
          <Flex.Item className={`${prefixCls}-wrap`}>
            <span className="active">{current}</span>/<span>{total}</span>
          </Flex.Item>)
        }
        <Flex.Item className={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-next`}>
          <Button
            inline
            disabled={current >= total}
            onClick={() => this.onChange(this.state.current + 1)}
          >
            {nextText}
          </Button>
        </Flex.Item>
      </Flex>
    );
    if (mode === 'number') {
      markup = (
        <div className={`${prefixCls}-wrap`}>
          <span className="active">{current + 1}</span>/<span>{total}</span>
        </div>
      );
    } else if (mode === 'pointer') {
      const arr: any = [];
      for (let i = 0; i < total; i++) {
        arr.push(
          <div
            key={`dot-${i}`}
            className={classNames({
              [`${prefixCls}-wrap-dot`]: true,
              [`${prefixCls}-wrap-dot-active`]: i === current,
            })}
          >
            <span />
          </div>,
        );
      }
      markup = <div className={`${prefixCls}-wrap`}>{arr}</div>;
    }
    return (
      <div
        className={classNames({ [className]: className, [prefixCls]: true })}
        style={style}
      >
        {markup}
      </div>
    );
  }
}
Pagination.defaultProps = {
  prefixCls: 'am-pagination',
  mode: 'button',
  current: 1,
  simple: false,
  onChange: () => { },
};
Pagination.propTypes = {
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  mode:React.PropTypes.oneOf(['button', 'number','pointer']),
  simple:React.PropTypes.bool,
  current:React.PropTypes.number,
  total:React.PropTypes.number,
  prevText: React.PropTypes.string,
  nextText: React.PropTypes.string,
  onPrev:React.PropTypes.func,
  onNext:React.PropTypes.func,
  onChange:React.PropTypes.func,
  indicatorStyle: React.PropTypes.any
};
Pagination.displayName = "Pagination";
module.exports=Pagination;
