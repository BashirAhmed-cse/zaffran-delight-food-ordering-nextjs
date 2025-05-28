import FlyingButton from 'react-flying-item';

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent">
        <FlyingButton
          targetTop="5%"
          targetLeft="95%"
          src={image}
        >
          <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full shadow-md transition duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7H18M7 13l1.5-7H21"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add ${basePrice}
          </button>
        </FlyingButton>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-6 py-2 transition duration-300 shadow-md"
    >
      Customize from ${basePrice}
    </button>
  );
}
