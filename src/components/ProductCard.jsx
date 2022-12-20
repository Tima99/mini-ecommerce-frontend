
export function ProductCard({product, btn}) {
    return (
        <div className="card">
            <div className="logo">
                <span>Dummy Image</span>
                {/* img */}
            </div>
            <div className="product-detail">
                <span className="title">{product.name}</span>
                <span className="description">{product.description}</span>
                <div className="flex between r-v-center flex-wrap">
                    <span className="price">{`${product.priceSym} ${product.price}`}</span>
                    {
                        <button className={btn.class} id={product.id} >{btn.text}</button>
                    }
                </div>
            </div>
        </div>
    );
}
