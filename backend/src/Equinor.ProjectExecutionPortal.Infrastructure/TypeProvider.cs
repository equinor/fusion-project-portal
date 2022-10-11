﻿using System.Reflection;

namespace Equinor.ProjectExecutionPortal.Infrastructure;

public static class TypeProvider
{
    private static List<Type> _entityTypeCache;

    public static List<Type> GetEntityTypes(Assembly assembly, Type baseType)
    {
        if (_entityTypeCache != null)
        {
            return _entityTypeCache;
        }

        _entityTypeCache = (from t in assembly.DefinedTypes
            where t.BaseType == baseType
            select t.AsType()).ToList();

        return _entityTypeCache;
    }
}
