export default function Menu(){
  return (
    <div className="grid-2">
      <div className="card menu-category">
        <h3>Starters</h3>
        <div className="menu-item"><span>Bruschetta — Fresh tomatoes, basil, olive oil, toasted baguette</span><strong>$8.50</strong></div>
        <div className="menu-item"><span>Caesar Salad — Crisp romaine with homemade Caesar dressing</span><strong>$9.00</strong></div>
      </div>
      <div className="card menu-category">
        <h3>Main Courses</h3>
        <div className="menu-item"><span>Grilled Salmon — Lemon butter sauce, seasonal vegetables</span><strong>$22.00</strong></div>
        <div className="menu-item"><span>Ribeye Steak — 12 oz prime, garlic mashed potatoes</span><strong>$28.00</strong></div>
        <div className="menu-item"><span>Vegetable Risotto — Arborio rice with wild mushrooms</span><strong>$18.00</strong></div>
      </div>
      <div className="card menu-category">
        <h3>Desserts</h3>
        <div className="menu-item"><span>Tiramisu — Classic Italian with mascarpone</span><strong>$7.50</strong></div>
        <div className="menu-item"><span>Cheesecake — Berry compote</span><strong>$7.00</strong></div>
      </div>
      <div className="card menu-category">
        <h3>Beverages</h3>
        <div className="menu-item"><span>Red Wine (Glass) — Selection of Italian reds</span><strong>$10.00</strong></div>
        <div className="menu-item"><span>White Wine (Glass) — Crisp and refreshing</span><strong>$9.00</strong></div>
        <div className="menu-item"><span>Craft Beer — Local artisan brews</span><strong>$6.00</strong></div>
        <div className="menu-item"><span>Espresso — Strong and aromatic</span><strong>$3.00</strong></div>
      </div>
    </div>
  )
}
