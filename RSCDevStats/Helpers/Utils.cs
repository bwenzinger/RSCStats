using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSCDevStats.Helpers
{
    public static class Utils
    {
        public static double TryParseDouble(object value){
            double tempValue = 0;
            Double.TryParse(value.ToString(), out tempValue);
            return tempValue;
        }

        public static int TryParseInt(object value)
        {
            int tempValue = 0;
            int.TryParse(value.ToString(), out tempValue);
            return tempValue;
        }

    }
}
