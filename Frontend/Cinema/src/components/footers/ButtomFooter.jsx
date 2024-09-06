

export const ButtomFooter = ({enClick=false, amount=14000,price=false, btnText, clasesExtra=false}) => {

    return (
        <footer className={`flex w-full bottom-0 fixed items-center ${clasesExtra && clasesExtra } ${ price ? 'justify-evenly' : 'justify-center' } h-[100px] bg-footerNav`}>
            {
                price && (
                    <div className="text-2xl">
                        <p>Price</p>
                        <p><strong>{`$ ${amount}`}</strong></p>
                    </div>
                )
            }
            <button  onClick={enClick ? enClick : undefined} type="submit" className={`${ price ? ' max-w-[65%]' : 'max-w-[84%]' } bg-red-600 p-[20px] w-full rounded-xl`}> { btnText } </button>
        </footer>
    )

}