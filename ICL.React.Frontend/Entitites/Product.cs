﻿namespace ICL.React.Frontend.Entitites
{
    public class Product
    {
        public Guid Id { get; set; }
        public DateTime CreateDate { get; set; }
        public Guid uuid { get; set; }
        public Guid PoUuid { get; set; }
        public string? LineItemId { get; set; }
        public string? ProductCode { get; set; }
        public string? Quantity { get; set; }
        public string? UnitDimension { get; set; }
        public string? UnitVolume { get; set; }
        public string? UnitWeight { get; set; }
        public string? UnitRate { get; set; }
        public string? OrderDetails { get; set; }
        public string? SKULineNo { get; set; }
    }
}
