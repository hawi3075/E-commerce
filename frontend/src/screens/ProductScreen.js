{/* LEFT BOX: Image Container */}
<div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between">
  <div>
    {/* Product Image Wrapper - Maximized Image Fill */}
    <div className="relative w-full h-[240px] sm:h-[280px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
      {currentStock > 0 ? (
        <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 bg-purple-50 text-purple-700 font-extrabold text-[10px] rounded-full border border-purple-200 shadow-sm">
          {t.inStock}
        </span>
      ) : (
        <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 bg-red-50 text-red-700 font-extrabold text-[10px] rounded-full border border-red-200 shadow-sm">
          {t.outOfStock}
        </span>
      )}
      
      <img 
        src={selectedImage} 
        alt={product.name || product.product_name} 
        className="w-full h-full object-cover rounded-xl transition-all duration-200"
      />
    </div>

    {/* Thumbnails */}
    {productImages.length > 1 && (
      <div className="flex items-center gap-2 overflow-x-auto pt-3">
        {productImages.map((imgUrl, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(imgUrl)}
            className={`w-12 h-12 rounded-lg overflow-hidden border transition-all flex-shrink-0 ${
              selectedImage === imgUrl ? 'border-purple-700 scale-105 shadow-sm' : 'border-gray-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={imgUrl} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    )}
  </div>

  {/* Minimal Specs */}
  <div className="grid grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-gray-100 text-center">
    <div className="p-1.5 bg-gray-50 rounded-lg">
      <p className="text-[9px] font-bold text-gray-400 uppercase">{t.availability}</p>
      <p className="text-xs font-black text-gray-900">{currentStock} in stock</p>
    </div>
    <div className="p-1.5 bg-gray-50 rounded-lg">
      <p className="text-[9px] font-bold text-gray-400 uppercase">{t.rating}</p>
      <p className="text-xs font-black text-gray-900">{product.rating ? `${product.rating} / 5` : '-'}</p>
    </div>
    <div className="p-1.5 bg-gray-50 rounded-lg">
      <p className="text-[9px] font-bold text-gray-400 uppercase">{t.variants}</p>
      <p className="text-xs font-black text-gray-900">{availableColors.length} Colors</p>
    </div>
  </div>
</div>