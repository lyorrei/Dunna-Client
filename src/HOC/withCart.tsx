import { motion } from 'framer-motion'
import React from 'react'
import Backdrop from '../components/backdrop'
import Cart from '../components/cart'

const withCart = WrappedComponent => {
    return class extends React.Component {
        state = {
            showCart: false
        }

        setShowCart = (boolean: boolean) => {
            this.setState({ showCart: boolean })
        }

        render() {
            return (
                <>
                    <WrappedComponent {...this.props} />

                    <Backdrop
                        show={this.state.showCart}
                        click={() => this.setState({ showCart: false })}
                    />
                    <Cart
                        setShowCart={this.setShowCart}
                        showCart={this.state.showCart}
                    />
                </>
            )
        }
    }
}

export default withCart
